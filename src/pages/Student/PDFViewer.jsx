import { useState, useEffect } from "react";
import useAuth from "../../Hooks/useAuth";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useNavigate, useParams } from "react-router";
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

  const navigate = useNavigate();


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

  const [student,setStudent] = useState(null);

  const fetchStudent = async()=> {
    const userId = sessionStorage.getItem('user_id');
    console.log(userId);
    try {
      const res = await axios.get(`${BASE_URL}student/getStudentByUserId/${userId}`)
      console.log(res.data);
      setStudent(res.data.studentDoc);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (chapterId) fetchChapter(chapterId);
    fetchStudent()
    startAndStop();
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
      studentId: userId,
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

  const [time, setTime] = useState(0);

  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  // Hours calculation
  const hours = Math.floor(time / 360000);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

  // Milliseconds calculation
  const milliseconds = time % 100;

  // Method to start and stop timer
  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  // Method to reset timer back to 0
  const reset = () => {
    setTime(0);
  };

  const chapterTimeUpdateApi = async (reqBody) => {
    console.log('i am here')
    try {
      const res = await axios.post(`${BASE_URL}chapterTime/update`,reqBody);
      console.log(res.data);
      navigate('/mycourse')
    } catch (error) {
      console.log(error)
    }
  }

  const sendChapterUpdate = () => {
    startAndStop();
      const reqBody = {
        "chapterId": chapterId,
        "studentId": student?._id,
        "time": seconds
    }
    console.log(reqBody);
    chapterTimeUpdateApi(reqBody);
  }

  return (
    <div className="container">
      <div className="stopwatch-container">
      <p className="stopwatch-time">
        {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </p>
      <div className="stopwatch-buttons">
        <button className="stopwatch-button" onClick={startAndStop}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button className="stopwatch-button" onClick={sendChapterUpdate}>
          Submit Time
        </button>
      </div>
    </div>
      {/* <form>
        <br></br>
        <input
          type="file"
          className="form-control"
          onChange={handleFile}
        ></input>
        {pdfError && <span className="text-danger">{pdfError}</span>}
      </form> */}

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
