// Imports
import "./App.css";
import { useEffect, useState } from "react";
import { getAllModels } from "./api/api";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

// Page Layout
import Header from "./components/Header/Header";
import Graph from "./components/Graph/Graph";
import ModelList from "./components/ModelList/ModelList";
import FileHandler from "./components/FileHandler/FileHandler";
import AnomaliesTable from "./components/AnomaliesTable/AnomaliesTable";

function App() {
  const [models, setModels] = useState([]);
  // just for testing
  const [anomalies, setAnomalies] = useState({
    anomalies: {
      speed: [],
      thorttle: [[2, 10]],
      gps: [
        [2, 50],
        [100, 300],
      ],
      enclose: [[8, 30], [15], [100, 300], [400]],
    },
    reason: "why",
  });
  const [model, setModel] = useState({});
  const [notification, setNotification] = useState({
    open: false,
    severity: "success",
    message: "Success!",
  });

  /**
   * @param {String} severity
   * @param {String} message
   * @see https://material-ui.com/components/snackbars/
   */
  function alert(severity, message) {
    setNotification({ open: true, severity, message });
  }

  function closeAlert() {
    setNotification({ ...notification, open: false });
  }

  /**
   * @description Updates `models` with data from the server
   */
  async function updateModels() {
    try {
      const data = await getAllModels();
      setModels(data);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * This method fires up only when the app is loaded initially
   */
  useEffect(() => {
    updateModels();
  }, []);

  return (
    <div className="App">
      <div className="dashboard">
        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={closeAlert}
        >
          <Alert onClose={closeAlert} severity={notification.severity}>
            {notification.message}
          </Alert>
        </Snackbar>
        <div className="content">
          <Header />
          <div className="grid">
            <div>
              <Graph models={models} />
            </div>
            <div>
              {ModelList.length > 0 ? (
                <ModelList
                  models={models}
                  setModel={setModel}
                  updateModels={updateModels}
                  model={model}
                />
              ) : (
                "No Models to Show"
              )}
            </div>
            <div>
              <AnomaliesTable anomalies={anomalies} />
            </div>
            <div>
              <FileHandler
                updateModels={updateModels}
                model={model}
                alert={alert}
                setAnomalies={setAnomalies}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
