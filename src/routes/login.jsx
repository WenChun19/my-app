import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { editUser, signIn, signUp } from "../api/auth";
import { getCookie, setCookie } from "../utils/cookies-helper";
import {
  accessToken,
  cartId,
  collectionId,
  firstDailyLimit,
} from "../constants";
import { addCartProduct } from "../api/carts";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { addTradingCollections } from "../api/collections";

const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 6 characters" }),
});

const Login = () => {
  const { isLogin, setIsLogin } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { errors } = formState;

  // const registerUser = async (data) => {
  //   const response = await signUp(data);

  //   if (response?.user?.id) {
  //     setCookie(accessToken, response?.accessToken);
  //     const cart = await addCartProduct({
  //       userId: response?.user?.id,
  //       products: [],
  //     });

  //     const collection = await addTradingCollections({
  //       userId: response?.user?.id,
  //       cards: [],
  //       dailyLimit: firstDailyLimit,
  //       availableDate: null,
  //     });

  //     await editUser({
  //       ...response?.user,
  //       password: data?.password,
  //       cartId: cart?.id,
  //       collectionId: collection?.id,
  //     });
  //     setCookie(cartId, cart?.id);
  //     setCookie(collectionId, collection?.id);
  //     navigate("/");
  //   }
  // };

  const onSubmit = async (data) => {
    const response = await signIn(data);

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
      <div className="border-2 border-blue-200 w-1/2  p-3  rounded-md">
        <form
          className="flex flex-col mx-4 space-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-center font-bold">LOGIN</h1>
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
                {...register("password")}
              />
            </label>
            {errors?.password && (
              <div className="text-red-500">{errors.password?.message}</div>
            )}
          </div>
          <button className="btn btn-primary self-end w-[100px]">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
