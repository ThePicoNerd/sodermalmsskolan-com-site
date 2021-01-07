import { Field, FormikValues } from "formik";
import React, { FunctionComponent } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../lib/auth/AuthContext";
import { translateFirebaseError } from "../../../lib/auth/forms";
import TextField from "../../form/field/TextField";
import AccountSetting from "../AccountSetting";

export interface Values extends FormikValues {
  displayName: string;
}

/**
 * `AccountSetting` for setting the `displayName` of a user.
 *
 * @returns {React.ReactElement} The rendered setting.
 */
const DisplayNameSetting: FunctionComponent = () => {
  const { user, reloadUser } = useAuth();

  const initialValues: Values = {
    displayName: user?.displayName,
  };

  return (
    <AccountSetting
      label="Namn"
      initialValues={initialValues}
      onSubmit={({ displayName }, { setSubmitting, setFieldError }) => {
        user.updateProfile({
          displayName,
        })
          .then(() => reloadUser())
          .catch((error) => {
            const { message } = translateFirebaseError(error);
            setFieldError("displayName", message);
          })
          .then(() => {
            toast.success("Ditt namn har ändrats.");
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      <Field
        name="displayName"
        validate={(displayName) => {
          if (displayName === user?.displayName) {
            return "Du måste välja ett nytt namn.";
          }

          return undefined;
        }}
      >
        {({
          field,
          meta: {
            error,
          },
        }) => (
          <TextField {...field} type="text" placeholder="Namn" error={error} />
        )}
      </Field>
    </AccountSetting>
  );
};

export default DisplayNameSetting;
