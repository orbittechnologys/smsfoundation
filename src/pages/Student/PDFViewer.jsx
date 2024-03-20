import { useState, useEffect } from "react";
import useAuth from "../../Hooks/useAuth";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useParams } from "react-router";
import axios from "axios";
import { BASE_URL } from "../../constants";

const PDFViewer = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfError, setPdfError] = useState("");
  const { chapterId } = useParams();
  const [chapter, setChapter] = useState(null);
  const { auth } = useAuth();
  const [timerRunning, setTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const fetchPdf = async (chapterUrl) => {
    try {
      const res = await axios.get(chapterUrl, { responseType: "blob" });
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfFile(url);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchChapter = async (chapterId) => {
    try {
      const res = await axios.get(`${BASE_URL}chapter/id/${chapterId}`);
      setChapter(res.data);
      fetchPdf(res.data.chapterUrl);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (chapterId) fetchChapter(chapterId);
  }, []);

  const allowedFiles = ["application/pdf"];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && allowedFiles.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfError("");
          setPdfFile(e.target.result);
        };
      } else {
        setPdfError("Not a valid pdf: Please select only PDF");
        setPdfFile("");
      }
    } else {
      console.log("please select a PDF");
    }
  };

  const startTimer = () => {
    setTimerRunning(true);
    const startTime = Date.now(); // Record the start time
    setStartTime(startTime); // Set the start time in the state
    setElapsedTime(0); // Reset elapsed time to 0
    setTotalTime(0); // Reset total time to 0

    // Update elapsed time at regular intervals
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      setElapsedTime(elapsed); // Update elapsed time
    }, 1000);

    // Clear the interval when the component unmounts or when the timer stops
    return () => clearInterval(interval);
  };

  const stopTimer = () => {
    if (timerRunning) {
      setTimerRunning(false);
      const endTime = Date.now();
      const elapsed = endTime - startTime;
      setTotalTime(totalTime + elapsed);
      setElapsedTime(0);
      sendTotalTime(totalTime + elapsed);
    }
  };

  const sendTotalTime = async (time) => {
    const reqbody = {
      chapterId: chapterId,
      studentId: "65f031d3da8fe73e5bceeaca",
      time: time,
    };
    console.log(reqbody);
    try {
      const res = await axios.post(`${BASE_URL}chapterTime/update`, reqbody);
      console.log(res.data);
      const hours = Math.floor(time / (1000 * 60 * 60));
      const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((time % (1000 * 60)) / 1000);
      console.log(time);
      console.log(
        "Total time:",
        `${hours} hours, ${minutes} minutes, ${seconds} seconds`
      );
    } catch (error) {
      console.error("Error sending total time:", error);
    }
  };

  return (
    <div className="container">
      <div>
        <div className="grid grid-cols-3">
          <button onClick={startTimer}>Start Timer</button>
          <button onClick={stopTimer}>Stop Timer</button>
          <button onClick={sendTotalTime}>send time</button>
        </div>
        {chapter && <p>Total Hours: {chapter.totalHours}</p>}
        {timerRunning && (
          <p>
            Elapsed Time:
            {String(Math.floor(elapsedTime / 1000) % 60).padStart(2, "0")}{" "}
            seconds
          </p>
        )}
      </div>
      <form>
        <label>
          <h5>Upload PDF</h5>
        </label>
        <br></br>
        <input
          type="file"
          className="form-control"
          onChange={handleFile}
        ></input>
        {pdfError && <span className="text-danger">{pdfError}</span>}
      </form>

      <h5>View PDF</h5>
      <div
        className="viewer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "800px",
          overflowY: "auto",
          marginBottom: "10px",
        }}
      >
        {pdfFile && (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer
              fileUrl={pdfFile}
              plugins={[defaultLayoutPluginInstance]}
            ></Viewer>
          </Worker>
        )}
        {!pdfFile && <>No file is selected yet</>}
      </div>
    </div>
  );
};

export default PDFViewer;
