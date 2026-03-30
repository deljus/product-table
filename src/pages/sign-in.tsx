import LogoIcon from "@/assets/logo.svg?react";
import { Link } from "react-router";
import { UserField } from "@/components/form-fields/user";
import { PasswordField } from "@/components/form-fields/password";
import { Checkbox } from "@/components/form-fields/checkbox";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const validateSchema = yup
  .object({
    username: yup.string().required("Обязательное поле"),
    password: yup.string().required("Обязательное поле"),
    rememberMe: yup.boolean(),
  })
  .required();

type FormFields = yup.InferType<typeof validateSchema>;

export function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validateSchema),
  });
  const onSubmit = (data: FormFields) => console.log(data);

  return (
    <div className="container h-full flex items-center justify-center w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
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
          {...register("username")}
          error={errors.username?.message}
          onClear={() => setValue("username", "")}
        />
        <label>Пароль</label>
        <PasswordField
          {...register("password")}
          error={errors.password?.message}
        />

        <Checkbox
          label="запомнить меня"
          className="mb-5"
          {...register("rememberMe")}
        />

        <button type="submit" className="btn w-full mb-4">
          Войти
        </button>

        <div className="divider mb-8">или</div>

        <div className="text-center text-lg text-coral-300">
          <span>Нет аккаунта? </span>
          <Link
            to="create-account"
            className="text-primary cursor-pointer font-semibold underline"
          >
            Создать
          </Link>
        </div>
      </form>
    </div>
  );
}
