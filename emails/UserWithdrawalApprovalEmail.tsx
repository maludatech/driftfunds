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

interface UserWithdrawalApprovalEmailProps {
  username: string;
  lastWithdrawal: number;
}

export const UserWithdrawalApprovalEmail = ({
  username,
  lastWithdrawal,
}: UserWithdrawalApprovalEmailProps) => {
  const year = new Date().getFullYear();

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>
          Your {lastWithdrawal ? lastWithdrawal.toString() : "N/A"} USD
          withdrawal has been approved
        </Preview>
        <Container style={container}>
          <Section style={header}>
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
              Thank you for your withdrawal request with {APP_NAME}.
            </Text>
            <Text>
              Your withdrawal of <strong>{lastWithdrawal} USD</strong> has been
              approved. Your wallet will be credited in 30 minutes, and your
              dashboard has been updated.
            </Text>
            <Text style={paragraph}>
              If you did not initiate this withdrawal, please contact our
              support team immediately via{" "}
              <Link href={`${APP_DOMAIN}/contact`} style={link}>
                {APP_NAME} Support
              </Link>
              .
            </Text>
            <Text style={paragraph}>
              Thank you for choosing {APP_NAME}.
              <br />
              {APP_NAME} Support Team
            </Text>
          </Section>
        </Container>
        <Section style={footer}>
          <Row>
            <Column align="right" style={{ width: "50%", paddingRight: "8px" }}>
              <Link href="https://x.com">
                <Img
                  src="https://res.cloudinary.com/dlnvweuhv/image/upload/v1748781084/twitter-icon.png"
                  alt="X"
                  width="32"
                  height="32"
                />
              </Link>
            </Column>
            <Column align="left" style={{ width: "50%", paddingLeft: "8px" }}>
              <Link href="https://facebook.com">
                <Img
                  src="https://res.cloudinary.com/dlnvweuhv/image/upload/v1748781084/facebook-icon.png"
                  alt="Facebook"
                  width="32"
                  height="32"
                />
              </Link>
            </Column>
          </Row>
          <Row>
            <Text style={{ textAlign: "center", color: "#706a7b" }}>
              © {year} {APP_NAME} Plc, All Rights Reserved
              <br />
              456 Blockchain Avenue, New York, USA
            </Text>
          </Row>
        </Section>
      </Body>
    </Html>
  );
};

export default UserWithdrawalApprovalEmail;

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

const header = {
  padding: "30px",
  background: "linear-gradient(90deg, #14B8A6 0%, #0F172A 100%)",
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
