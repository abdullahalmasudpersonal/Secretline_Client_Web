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
  } = useForm<FormValues>();
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [createNewContact] = useCreateNewContactMutation();
  const { data: allUserData } = useGetAllUserQuery({});
  const allUsers = allUserData?.data || [];

  // const alluseremail = allUserData?.data?.map((user: TUser) => user?.email);
  // // const checkExistsEmail = async (email: string) => {
  // //   const existingEmails = alluseremail;
  // //   return existingEmails.includes(email);
  // // };

  const handleEmailCheck = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value.trim();
    if (!email) {
      setEmailError(null);
      setSelectedUser(null);
      clearErrors("email");
      return;
    }

    const user = allUsers.find((user: TUser) => user.email === email);
    if (!user) {
      setEmailError("This email is not registered in SecretLine.");
      setSelectedUser(null);
      setError("email", {
        type: "manual",
        message: "This email is not registered in SecretLine.",
      });
    } else {
      setEmailError(null);
      setSelectedUser(user);
      clearErrors("email");
    }
  };

  // ফোন নাম্বার চেক করার ফাংশন
  const handlePhoneCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value.trim();
    if (!phone || !selectedUser) {
      setPhoneError(null);
      clearErrors("phone");
      return;
    }

    if (selectedUser.phone !== phone) {
      setPhoneError("This phone number does not match the email.");
      setError("phone", {
        type: "manual",
        message: "This phone number does not match the email.",
      });
    } else {
      setPhoneError(null);
      clearErrors("phone");
    }
  };

  const onFinish: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await createNewContact(data).unwrap();
      if (res?.success) {
        toast.success(res.message);
        reset();
        setAddContact(false);
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error((error as any)?.data?.message);
      // reset();
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
              {...register("phone", { required: true, minLength: 11 })}
              placeholder="Enter phone"
              autoComplete="off"
              className="addNewContactInput"
              onChange={handlePhoneCheck}
            />
          </div>
          <div className="checkExistsEmailError">
            {phoneError && <p>{phoneError}</p>}
          </div>
          <div className="saveNewContactDiv">
            <button
              className="saveNewContactButton"
              disabled={!!emailError || !!phoneError}
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewContact;
