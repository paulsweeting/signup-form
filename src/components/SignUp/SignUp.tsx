import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Details from "./Details/Details";

const initialValues = {
  firstName: "",
  lastName: "",
  age: "",
  email: "",
  password: "",
};

const validation = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const SignUp = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      {submitted && <h1>Submitted Successfully</h1>}
      <h1 className="text-center text-xl font-bold mt-[5%]">Sign Up</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={() => setSubmitted(true)}
        validationSchema={validation}
      >
        <Details />
      </Formik>
    </div>
  );
};

export default SignUp;
