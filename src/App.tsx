import React from "react";
import { Container } from "theme-ui";
import { Redirect, Route, Switch } from "react-router-dom";
import { Vaults } from "src/pages/Vaults";
import { Mint } from "src/pages/Mint";
import { Treasury } from "src/pages/Treasury";
import { Header } from "src/components/Header";
import Modal from "react-modal";
import { Footer } from "src/components/Footer";
import { ToastContainer } from "react-toastify";
import { Page } from "./state/global";

const App: React.FC = () => {
  React.useEffect(() => {
    Modal.setAppElement("body");
  });

  return (
    <Container sx={{ maxWidth: "100%", width: "auto" }}>
      <Container sx={{ py: 6, px: [4, "15%"] }}>
        <Header />
        <Switch>
          <Route exact path="/">
            <Redirect to={Page.VAULTS} />
          </Route>
          <Route exact path={`/${Page.VAULTS}`}>
            <Vaults />
          </Route>
          <Route exact path={`/${Page.MINT}`}>
            <Mint />
          </Route>
          <Route exact path="/treasury">
            <Treasury />
          </Route>
        </Switch>
      </Container>
      <Footer />
      <ToastContainer
        style={{ background: "var(--theme-ui-colors-background)" }}
        toastClassName="toast-body"
        bodyClassName="toast-body"
      />
    </Container>
  );
};

export default App;
