import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AddNewContact.css";
import {
  faArrowLeft,
  faEnvelope,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateNewContactMutation } from "../../../../../redux/features/contact/contactApi";
import { toast } from "sonner";
import { useGetAllUserQuery } from "../../../../../redux/features/user/userApi";
import { TUser } from "../../../../../types/user.types";
import { useState } from "react";

type AddNewContactProps = {
  setAddContact: (value: boolean) => void;
};
type FormValues = {
  name: string;
  email: string;
  phone: number;
};

const AddNewContact = ({ setAddContact }: AddNewContactProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    // formState: { errors },
  } = useForm<FormValues>();
  const [emailError, setEmailError] = useState<string | null>(null);
  const [createNewContact] = useCreateNewContactMutation();
  const { data: allUserData } = useGetAllUserQuery({});
  const alluseremail = allUserData?.data?.map((user: TUser) => user?.email);

  const checkExistsEmail = async (email: string) => {
    const existingEmails = alluseremail;
    return existingEmails.includes(email);
  };

  const handleEmailCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;

    if (!email) {
      setEmailError(null);
      clearErrors("email");
      return;
    }

    const exists = await checkExistsEmail(email);
    if (!exists) {
      setEmailError("This email is not use secretline.");
      setError("email", {
        type: "manual",
        message: "This email is not use secretline.",
      });
    } else {
      setEmailError(null);
      clearErrors("email");
    }
  };

  const onFinish: SubmitHandler<FormValues> = async (data) => {
    const res = await createNewContact(data);
    if (res) {
      toast.success("New contact create successfully");
      reset();
      setAddContact(false);
    }
  };

  return (
    <div className="addNewContact">
      <div className="addNewContactBackNavigate">
        <FontAwesomeIcon
          onClick={() => setAddContact(false)}
          style={{ cursor: "pointer" }}
          icon={faArrowLeft}
        />
        <p style={{ margin: "0" }}>New Contact</p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onFinish)}>
          <div className="addNewContactInputDiv">
            <FontAwesomeIcon icon={faUser} />
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Enter full name"
              autoComplete="off"
              className="addNewContactInput"
            />
          </div>
          <div className="addNewContactInputDiv">
            <FontAwesomeIcon icon={faEnvelope} />
            <div style={{ width: "100%" }}>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter email"
                autoComplete="off"
                className="addNewContactInput"
                onChange={handleEmailCheck}
              />
            </div>
          </div>
          <div className="checkExistsEmailError">
            {emailError && <p>{emailError}</p>}
          </div>
          <div className="addNewContactInputDiv">
            <FontAwesomeIcon icon={faPhone} />
            <input
              type="number"
              onInput={(e) => {
                if (e.currentTarget.value.length > 11) {
                  e.currentTarget.value = e.currentTarget.value.slice(0, 11);
                }
              }}
              {...register("phone", { required: true })}
              placeholder="Enter phone"
              autoComplete="off"
              className="addNewContactInput"
            />
          </div>

          {!emailError && (
            <div className="saveNewContactDiv">
              <button
                className="saveNewContactButton"
                disabled={!!emailError}
                type="submit"
              >
                Save
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddNewContact;
