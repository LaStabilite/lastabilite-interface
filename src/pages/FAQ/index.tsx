import React from "react";
import { Box, Flex, Heading, Link } from "theme-ui";
import { BlockText } from "src/components/BlockText";

const QuestionAnswer: React.FC<{
  question: React.ReactNode;
  answer: React.ReactNode;
}> = ({ question, answer }) => {
  return (
    <Box mb={4}>
      <Heading as="h2">{question}</Heading>
      <BlockText variant="primary" sx={{ maxWidth: "5rem" }}>
        {answer}
      </BlockText>
    </Box>
  );
};

export const FAQ: React.FC = () => {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Box sx={{ maxWidth: "540px" }}>
        <QuestionAnswer
          question="What is La Stabilité?"
          answer="La Stabilité is a DeFi protocol that consolidates tokens with the same peg. For example, stabilUSD consolidates cUSD and USDC."
        />
        <QuestionAnswer
          question="What is the STABIL token?"
          answer={
            <>
              The STABIL token is a protocol token that is automatically bought
              back on{" "}
              <Link
                href="https://app.ubeswap.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ubeswap
              </Link>{" "}
              using fees generated from the vaults.
            </>
          }
        />
        <QuestionAnswer
          question="How secure is La Stabilité?"
          answer={
            <>
              La Stabilité's code is{" "}
              <Link
                href="https://github.com/LaStabilite"
                target="_blank"
                rel="noopener noreferrer"
              >
                completely open-source
              </Link>{" "}
              and verified on{" "}
              <Link
                href="https://sourcify.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sourcify
              </Link>
              . The contracts have been statically analyzed with{" "}
              <Link
                href="https://github.com/crytic/slither"
                target="_blank"
                rel="noopener noreferrer"
              >
                Slither
              </Link>{" "}
              and are regularly checked via CI. As with any crypto project, use
              La Stabilité at your own risk and DYOR.
            </>
          }
        />
        <QuestionAnswer
          question="How can I participate in La Stabilité's community?"
          answer={
            <>
              <Link
                href="https://discord.gg/mE6ZWjxRsW"
                target="_blank"
                rel="noopener noreferrer"
              >
                Discord
              </Link>{" "}
              <Link
                href="https://twitter.com/LaStabilite"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </Link>
            </>
          }
        />
      </Box>
    </Flex>
  );
};
