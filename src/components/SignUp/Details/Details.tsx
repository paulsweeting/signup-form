import { Field, Form, useFormikContext } from "formik";

const Details = () => {
  const { errors, touched } = useFormikContext<{
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }>();

  return (
    <Form>
      <div className="w-[600px] mx-auto flex flex-col space-y-10 mt-10 box border border-black p-14 rounded-lg bg-gray-400">
        <label className="flex flex-col mb-1 font-medium text-md">
          First Name{" "}
          <Field
            name="firstName"
            className={`rounded h-8 outline-none p-3 ${
              touched.firstName && errors.firstName && " border border-red-600"
            }`}
            input
          />
          <p className="text-red-600 text-sm">
            {touched.firstName && errors.firstName}
          </p>
        </label>
        <label className="flex flex-col mb-1 font-medium text-md">
          Last Name
          <Field
            name="lastName"
            className={`rounded h-8 outline-none p-3 ${
              touched.lastName && errors.lastName && "border border-red-600"
            }`}
            input
          />
          <p className="text-red-600 text-sm">
            {touched.lastName && errors.lastName}
          </p>
        </label>

        <label className="flex flex-col mb-1 font-medium text-md">
          Email
          <Field
            name="email"
            className={`rounded h-8 outline-none p-3 ${
              touched.email && errors.email && "border border-red-600"
            }`}
            input
          />
          <p className="text-red-600 text-sm">
            {touched.email && errors.email}
          </p>
        </label>
        <label className="flex flex-col mb-1 font-medium text-md">
          Password
          <Field
            name="password"
            className={`rounded h-8 outline-none p-3 ${
              touched.password && errors.password && "border border-red-600"
            }`}
          />
          <p className="text-red-600 text-sm">
            {touched.password && errors.password}
          </p>
        </label>
        <button className="bg-purple-700 w-24 h-12 rounded text-white text-medium">
          Submit
        </button>
      </div>
    </Form>
  );
};
export default Details;
