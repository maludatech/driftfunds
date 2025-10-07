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
  resetToken?: string;
}

export const PasswordForgotEmail = ({
  username = "User",
  resetToken = "******",
}: PasswordResetEmailProps) => {
  const year = new Date().getFullYear();

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>
          You requested a password reset for your {APP_NAME} account
        </Preview>
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
            <Text style={paragraph}>Hello {username},</Text>
            <Text style={paragraph}>
              You recently requested to reset your password for your {APP_NAME}{" "}
              account.
            </Text>
            <Text style={codeBlock}>{resetToken}</Text>
            <Text style={paragraph}>
              Please use the above code to reset your password. This code will
              expire in 30 minutes.
            </Text>
            <Text style={paragraph}>
              If you did not request this, please{" "}
              <Link href={`${APP_DOMAIN}/contact`} style={link}>
                contact our support team
              </Link>{" "}
              immediately.
            </Text>
            <Text style={paragraph}>
              Thanks,
              <br />
              <strong>{APP_NAME} Support Team</strong>
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
              123 Financial Street, London, UK
            </Text>
          </Row>
        </Section>
      </Body>
    </Html>
  );
};

const fontFamily = "HelveticaNeue,Helvetica,Arial,sans-serif";

const main = {
  backgroundColor: "#efeef1",
  fontFamily,
};

const paragraph = {
  lineHeight: 1.5,
  fontSize: 14,
  color: "#555",
};

const container = {
  maxWidth: "580px",
  margin: "30px auto",
  backgroundColor: "#ffffff",
  border: "1px solid #ddd",
  borderRadius: "10px",
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
  textAlign: "center" as const,
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
  borderBottom: "1px solid #8968ee",
  width: "102px",
};

const link = {
  textDecoration: "underline",
  color: "#8968ee",
};

const codeBlock = {
  fontSize: "22px",
  fontWeight: "bold",
  color: "#333",
  backgroundColor: "#f8f8f8",
  padding: "10px 15px",
  borderRadius: "5px",
  textAlign: "center" as const,
  margin: "20px 0",
};

export default PasswordForgotEmail;
