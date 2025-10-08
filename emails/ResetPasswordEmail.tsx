import { APP_DOMAIN, APP_LOGO_URL, APP_NAME } from "@/lib/constants";
import {
  Body,
  Column,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface PasswordResetEmailProps {
  username?: string;
  userId?: string;
  updatedDate?: Date;
}

export const PasswordResetEmail = ({
  username = "User",
  userId,
  updatedDate = new Date(),
}: PasswordResetEmailProps) => {
  const formattedDate = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(updatedDate);

  const year = new Date().getFullYear();

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>You updated the password for your {APP_NAME} account</Preview>
        <Container style={container}>
          <Section style={logo}>
            <Img
              width={114}
              src={APP_LOGO_URL}
              alt={`${APP_NAME} Logo`}
              style={logoImg}
            />
          </Section>
          <Section style={sectionsBorders}>
            <Row>
              <Column style={sectionBorder} />
              <Column style={sectionCenter} />
              <Column style={sectionBorder} />
            </Row>
          </Section>
          <Section style={content}>
            <Text style={paragraph}>Hi {username},</Text>
            <Text style={paragraph}>
              You updated the password for your {APP_NAME} account on{" "}
              {formattedDate}. If this was you, no further action is required.
            </Text>
            <Text style={paragraph}>
              If you did NOT perform this password change, please{" "}
              <Link
                href={`${APP_DOMAIN}/reset-password?userId=${userId}`}
                style={link}
              >
                reset your account password
              </Link>{" "}
              immediately.
            </Text>
            <Text style={paragraph}>
              For security, use a strong and unique password for your {APP_NAME}
              account.
            </Text>
            <Text style={paragraph}>
              Need help? Contact{" "}
              <Link href={`${APP_DOMAIN}/contact`} style={link}>
                {APP_NAME} Support
              </Link>
              .
            </Text>
            <Text style={paragraph}>
              Thanks,
              <br />
              {APP_NAME} Support Team
            </Text>
          </Section>
        </Container>
        <Section style={footer}>
          <Row>
            <Column align="right" style={{ width: "50%", paddingRight: "8px" }}>
              <Img
                src={`https://res.cloudinary.com/dlnvweuhv/image/upload/v1748781084/twitter-icon.png`}
                alt="X"
                width="32"
                height="32"
              />
            </Column>
            <Column align="left" style={{ width: "50%", paddingLeft: "8px" }}>
              <Img
                src={`https://res.cloudinary.com/dlnvweuhv/image/upload/v1748781084/facebook-icon.png`}
                alt="Facebook"
                width="32"
                height="32"
              />
            </Column>
          </Row>
          <Row>
            <Text style={{ textAlign: "center", color: "#706a7b" }}>
              © {year} {APP_NAME} Plc, All Rights Reserved <br />
              456 Blockchain Avenue, New York, USA
            </Text>
          </Row>
        </Section>
      </Body>
    </Html>
  );
};

PasswordResetEmail.PreviewProps = {
  username: "User",
  updatedDate: new Date(),
} as PasswordResetEmailProps;

export default PasswordResetEmail;

const fontFamily = "HelveticaNeue,Helvetica,Arial,sans-serif";

const main = {
  backgroundColor: "#efeef1",
  fontFamily,
};

const paragraph = {
  lineHeight: 1.5,
  fontSize: 14,
};

const container = {
  maxWidth: "580px",
  margin: "30px auto",
  backgroundColor: "#ffffff",
};

const footer = {
  maxWidth: "580px",
  margin: "0 auto",
};

const content = {
  padding: "5px 20px 10px 20px",
};

const logo = {
  padding: 30,
};

const logoImg = {
  margin: "0 auto",
};

const sectionsBorders = {
  width: "100%",
};

const sectionBorder = {
  borderBottom: "1px solid rgb(238,238,238)",
  width: "249px",
};

const sectionCenter = {
  borderBottom: "1px solid #14b8a6",
};

const link = {
  textDecoration: "underline",
  color: "#14b8a6",
};
