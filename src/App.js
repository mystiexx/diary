import React, { useState} from "react";
import Layout from "./components/Layout/Layout";
import UnAuthenticated from "./components/Authentication/UnAunthenicated";

const App = () => {
    const [darkMode, setDarkMode] = useState(false);

    const handleSwitch = () => {
        setDarkMode(!darkMode);
    };
    return (
        <Layout darkMode={darkMode} handleSwitch={handleSwitch}>
          <UnAuthenticated darkMode={darkMode}/>
        </Layout>
    );
};

export default App;
