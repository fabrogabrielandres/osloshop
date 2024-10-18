"use client";
import { titleFont } from "@/config/fonts";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import clsx from "clsx";
import { login, newAccount } from "@/actions";

export default function NewAccountPage() {
  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      password: Yup.string()
        .max(20, "Must be 20 characters or less")
        .min(6, "Must be 6 characters or more")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values) => {
      const response = await newAccount({ ...values });
      if (!response.ok && response.error["email"]) {
        formik.setErrors({
          email: "email was created already",
        });
      }

      try {
        await login({ email: values.email, password: values.password });
        window.location.replace("/");

      } catch (error) {
        console.log(error);
                
      }
    },
  });
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Nueva cuenta</h1>

      <div className="flex flex-col">
        <label htmlFor="email">Nombre completo</label>
        <input
          className={clsx("px-5 py-2 border bg-gray-200 rounded", {
            "border-red-500": formik.errors.name,
          })}
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        <span className="text-red-500 mb-5">
          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>
          ) : null}
        </span>

        <label htmlFor="email">Correo electrónico</label>
        <input
          className={clsx("px-5 py-2 border bg-gray-200 rounded", {
            "border-red-500": formik.errors.email,
          })}
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <span className="text-red-500 mb-5">
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </span>

        <label htmlFor="email">Contraseña</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className={clsx("px-5 py-2 border bg-gray-200 rounded", {
            "border-red-500": formik.errors.password,
          })}
        />
        <span className="text-red-500 mb-5">
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </span>

        <button
          className="btn-primary"
          disabled={
            !!formik.errors.email ||
            !!formik.errors.name ||
            !!formik.errors.password
          }
          onClick={formik.submitForm}
        >
          Crear cuenta
        </button>

        {/* divisor l ine */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link href="/auth/login" className="btn-secondary text-center">
          Ingresar
        </Link>
      </div>
    </div>
  );
}
