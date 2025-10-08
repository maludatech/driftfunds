import { APP_DOMAIN, APP_LOGO_URL, APP_NAME } from "@/lib/constants";
import {
  Body,
  Button,
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

interface WelcomeEmailProps {
  username?: string;
}

export const WelcomeEmail = ({ username = "User" }: WelcomeEmailProps) => {
  const year = new Date().getFullYear();

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>
          Welcome to {APP_NAME}, your platform for online trading and financial
          growth
        </Preview>
        <Container style={container}>
          <Section style={logo}>
            <Img
              width={80}
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
              Welcome to {APP_NAME}! You’ve just joined a community of investors
              taking charge of their financial future. Your account is live,
              it’s time to explore the tools that can turn your goals into
              results.
            </Text>
            <Section style={btnContainer}>
              <Button style={button} href={`${APP_DOMAIN}/sign-in`}>
                Log In Now
              </Button>
            </Section>
            <Text style={paragraph}>
              Need help? Contact{" "}
              <Link href={`${APP_DOMAIN}/contact`} style={link}>
                {APP_NAME} Support
              </Link>
              .
            </Text>
            <Text style={paragraph}>
              Best,
              <br />
              {APP_NAME} Team
            </Text>
          </Section>
        </Container>
        <Section style={footer}>
          <Row>
            <Column align="right" style={{ width: "50%", paddingRight: "8px" }}>
              <Img
                src="https://res.cloudinary.com/dlnvweuhv/image/upload/v1748781084/twitter-icon.png"
                alt="X"
                width="32"
                height="32"
              />
            </Column>
            <Column align="left" style={{ width: "50%", paddingLeft: "8px" }}>
              <Img
                src="https://res.cloudinary.com/dlnvweuhv/image/upload/v1748781084/facebook-icon.png"
                alt="Facebook"
                width="32"
                height="32"
              />
            </Column>
          </Row>
          <Row>
            <Text style={{ textAlign: "center", color: "#706a7b" }}>
              © {year} {APP_NAME} Plc, All Rights Reserved <br />
              456 Blockchain Avenue, New York, USA <br />
            </Text>
          </Row>
        </Section>
      </Body>
    </Html>
  );
};

WelcomeEmail.PreviewProps = {
  username: "User",
} as WelcomeEmailProps;

export default WelcomeEmail;

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
  borderBottom: "1px solid #14b8a6",
  width: "102px",
};

const link = {
  textDecoration: "underline",
  color: "#14b8a6",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#14b8a6",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};
