import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.css";

const schema = Yup.object().shape({
  email: Yup.string().required("Required"),
});

export default function Buttondown({ apiKey, onSubscribe }) {
  const [subscribed, setSubscribed] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleOnSubmit = async (values, actions) => {
    const apiUrl = "https://api.buttondown.email/v1/subscribers";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${apiKey}`,
      },
      body: JSON.stringify(values),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();

      actions.setSubmitting(false);

      // 400 BAD REQUEST buttondown sends an array with a string message
      if (response.status === 400) {
        actions.setErrors({
          email:
            "There was an error processing your email address. Please try again.",
        });
      }

      // 201 CREATED buttondown sends this as success message
      else if (response.status === 201) {
        setSubscribed(true);
        // if onSubscribe is defined, call it with returned data
        // else call default value which is a noop () => {}
        onSubscribe(data);
      }

      // I have not identified the response
      else {
        console.error("UNKNOWN RESPONSE");
        console.log(data, response.status);
        setError("Unknown Response");
      }
    } catch (err) {
      setError("Error. Please refresh the page and try again.");
      console.error(err);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  // this may not be necessary if user wants to control what happens to UI
  // onSubscribe
  if (subscribed) {
    return <div>You subscribed!</div>;
  }

  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={handleOnSubmit}
      validationSchema={schema}
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

Buttondown.defaultProps = {
  onSubscribe: () => {},
};

Buttondown.propTypes = {
  apiKey: PropTypes.string.isRequired,
  onSubscribe: PropTypes.func.isRequired,
};
