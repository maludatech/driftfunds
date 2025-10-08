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

interface AdminWithdrawalEmailProps {
  username: string;
  email: string;
  pendingWithdrawal: number;
  selectedCoin: string;
  walletAddress: string;
}
`  `;

export const AdminWithdrawalEmail = ({
  username,
  email,
  pendingWithdrawal,
  selectedCoin,
  walletAddress,
}: AdminWithdrawalEmailProps) => {
  const year = new Date().getFullYear();

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>
          New {pendingWithdrawal ? pendingWithdrawal.toString() : "N/A"} USD
          withdrawal by {username}
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
            <Text style={paragraph}>Hello Admin,</Text>
            <Text style={paragraph}>
              You have received a new withdrawal request from{" "}
              <strong>{username}</strong> ({email}).
            </Text>
            <Text>
              Withdrawal Amount: <strong>{pendingWithdrawal} USD</strong>
              <br />
              Cryptocurrency: <strong>{selectedCoin}</strong>
              <br />
              Wallet Address: <strong>{walletAddress}</strong>
            </Text>
            <Text style={paragraph}>
              Please review and confirm this withdrawal to notify {username} via
              their email:{" "}
              <Link href={`mailto:${email}`} style={link}>
                {email}
              </Link>
              .
            </Text>
            <Text style={paragraph}>
              Need assistance? Contact{" "}
              <Link href={`${APP_DOMAIN}/contact`} style={link}>
                contact our support team
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

export default AdminWithdrawalEmail;

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
  maxWidth: "600px",
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
