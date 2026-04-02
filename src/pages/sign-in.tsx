import LogoIcon from "@/assets/logo.svg?react";
import { Link } from "react-router";
import { UserField } from "@/components/form-fields/user-field";
import { PasswordField } from "@/components/form-fields/password-field";
import { Checkbox } from "@/components/form-fields/checkbox";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { auth } from "@/libs/services";
import * as TokenStorage from "@/libs/token-storage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import cn from "classnames";

const validateSchema = yup
  .object({
    username: yup.string().required("Обязательное поле"),
    password: yup.string().required("Обязательное поле"),
    rememberMe: yup.boolean(),
  })
  .required();

export function SignInPage() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: yupResolver(validateSchema),
  });

  const authMutation = useMutation({
    mutationFn: auth.login,
    onSuccess: (response) => {
      TokenStorage.clear();
      const { accessToken, refreshToken } = response.data;
      const { rememberMe } = form.getValues();
      TokenStorage.set({ accessToken, refreshToken, isSesson: !rememberMe });
      navigate("/");
    },
    onError: (error) => toast.error(error.message),
  });

  const { errors } = form.formState;

  return (
    <div className="h-full flex items-center justify-center w-full">
      <form
        onSubmit={form.handleSubmit(({ username, password }) =>
          authMutation.mutate({ username, password }),
        )}
        className="max-w-[515px] border-[6px] border-white bg-base w-full rounded-[40px] 
                   bg-gradient-to-b from-[#232323/.3] to-white p-12
                   shadow-[0px_24px_32px_0px_rgba(0,_0,_0,_0.04)]"
      >
        <LogoIcon className="mx-auto" />
        <h1 className="font-semibold text-4xl text-black text-center mb-3">
          Добро пожаловать!
        </h1>
        <h2 className="text-lg text-coral-200 text-center mb-3">
          Пожалуйста, авторизируйтесь
        </h2>
        <label>Логин</label>
        <UserField
          {...form.register("username")}
          error={errors?.username?.message}
          onClear={() => form.setValue("username", "")}
        />
        <label>Пароль</label>
        <PasswordField
          {...form.register("password")}
          error={errors.password?.message}
        />

        <Checkbox
          label="запомнить меня"
          className="mb-5"
          {...form.register("rememberMe")}
        />

        <button
          type="submit"
          className={cn(
            "btn btn-primary btn-lg w-full mb-4",
            authMutation.isPending && "animate-pulse",
          )}
          disabled={authMutation.isPending}
        >
          Войти
        </button>

        <div className="divider mb-8">или</div>

        <div className="text-center text-lg text-coral-300">
          <span>Нет аккаунта? </span>
          <Link
            to="/create-account"
            className="text-primary cursor-pointer font-semibold underline"
          >
            Создать
          </Link>
        </div>
      </form>
    </div>
  );
}
