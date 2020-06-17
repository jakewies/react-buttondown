import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./buttondown-form.module.css";
import useButtondown from "./use-buttondown";

export default function ButtondownForm({ apiKey, onSubscribe }) {
  const [showConfirmMessage, setShowConfirmMessage] = React.useState(false);
  const { addSubscriber } = useButtondown(apiKey);

  const handleOnSubmit = async (values, actions) => {
    try {
      const response = await addSubscriber(values.email);
      const subscriber = response.data;
      setShowConfirmMessage(true);
      onSubscribe(subscriber);
    } catch (err) {
      actions.setErrors({
        email:
          "There was an error processing your email address. Please try again.",
      });
    }
  };

  if (showConfirmMessage) {
    return (
      <p>
        You're almost subscribed! I sent you an email to confirm your address.
        Click it and you're in!
      </p>
    );
  }

  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={handleOnSubmit}
      validationSchema={Yup.object().shape({
        email: Yup.string().required("Required"),
      })}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        dirty,
        isSubmitting,
        errors,
      }) => (
        <React.Fragment>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />

            <button
              className={styles.button}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing" : "Subscribe"}
            </button>
          </form>
          {errors.email && <div className={styles.errors}>{errors.email}</div>}
        </React.Fragment>
      )}
    </Formik>
  );
}

ButtondownForm.defaultProps = {
  onSubscribe: () => {},
};

ButtondownForm.propTypes = {
  apiKey: PropTypes.string.isRequired,
  onSubscribe: PropTypes.func.isRequired,
};
