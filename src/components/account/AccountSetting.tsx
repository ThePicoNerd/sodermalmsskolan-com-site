import {
  Form,
  Formik, FormikHelpers, FormikValues,
} from "formik";
import React, {
  PropsWithChildren, ReactElement, ReactNode,
} from "react";
import Card from "../Card";
import SubmitButton from "../form/SubmitButton";
import { CardTitle } from "../text/headings";
import { CardDescription } from "../text/paragraphs";

export interface AccountSettingProps<Values extends FormikValues> {
  initialValues: Values;
  onSubmit: (values: Values, helpers: FormikHelpers<Values>) => void | Promise<unknown>;
  label: ReactNode;
  description?: ReactNode;
}

/**
 * Account option form.
 *
 * @param {PropsWithChildren<AccountSettingProps>} props The props.
 *
 * @returns {React.ReactElement} The rendered form.
 */
const AccountSetting = <Values extends FormikValues>({
  onSubmit,
  initialValues,
  children,
  label,
  description,
}: PropsWithChildren<AccountSettingProps<Values>>): ReactElement => (
  <Card>
    <CardTitle>{label}</CardTitle>
    {description ? <CardDescription>{description}</CardDescription> : null}
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      enableReinitialize
    >
      <Form>
        {children}
        <SubmitButton
          css={{
            padding: "0.75rem 1rem",
            fontSize: "0.75rem",
            float: "right",
          }}
        >
          Ändra
        </SubmitButton>
      </Form>
    </Formik>
  </Card>
  );

export default AccountSetting;
