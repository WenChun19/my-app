import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { z } from "zod";
import { editUser, signUp } from "../api/auth";
import { addCartProduct } from "../api/carts";
import { addTradingCollections } from "../api/collections";
import {
  accessToken,
  cartId,
  collectionId,
  firstDailyLimit,
} from "../constants";
import { useAuth } from "../provider/AuthProvider";
import { setCookie } from "../utils/cookies-helper";

const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 6 characters" }),
});

const Signup = () => {
  const { isLogin, setIsLogin } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { errors } = formState;

  const registerUser = async (data) => {
    const response = await signUp(data);

    if (response?.user?.id) {
      setCookie(accessToken, response?.accessToken);
      const cart = await addCartProduct({
        userId: response?.user?.id,
        products: [],
      });

      const collection = await addTradingCollections({
        userId: response?.user?.id,
        cards: [],
        dailyLimit: firstDailyLimit,
        availableDate: null,
      });

      await editUser({
        ...response?.user,
        password: data?.password,
        cartId: cart?.id,
        collectionId: collection?.id,
      });
      setCookie(cartId, cart?.id);
      setCookie(collectionId, collection?.id);
      navigate("/");
    }
  };

  const onSubmit = async (data) => {
    const response = await registerUser(data);

    console.log(response);
    if (response?.accessToken) {
      setCookie(accessToken, response?.accessToken);
      setCookie(cartId, response?.user?.cartId);
      setCookie(collectionId, response?.user?.collectionId);
      setIsLogin(true);
      navigate("/");
    }
  };

  if (isLogin) {
    return <Navigate to={"/"} />;
  }
  return (
    <section className="w-full h-full flex items-center justify-center">
      <div className="border-2 border-blue-200 sm:w-1/2 lg:w-1/3 w-full p-3  rounded-md">
        <form
          className="flex flex-col mx-4 space-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-center font-bold">SIGNUP</h1>
          <div>
            <label
              className={`input ${
                errors?.email ? "input-error" : "input-bordered"
              } flex items-center gap-2`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                {...register("email")}
              />
            </label>
            {errors?.email && (
              <div className="text-red-500">{errors.email?.message}</div>
            )}
          </div>
          <div>
            <label
              className={`input ${
                errors?.password ? "input-error" : "input-bordered"
              } flex items-center gap-2`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="Password"
                {...register("password")}
              />
            </label>
            {errors?.password && (
              <div className="text-red-500">{errors.password?.message}</div>
            )}
          </div>
          <div className=" flex self-end mt-2">
            <div className="text-xs text-cyan-600 pr-3 pb-3 w-[200px] self-end text-right">
              Got account already?
              <span className="block font-bold mr-2 underline">
                <Link to="/login">Sign in now</Link>
              </span>
            </div>
            <button className="btn btn-primary ">Submit</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
