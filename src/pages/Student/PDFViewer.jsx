import { useState, useEffect } from "react";
import useAuth from "../../Hooks/useAuth";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useLocation, useNavigate, useParams } from "react-router";
import axios from "axios";
import { BASE_URL, SYNC_URL } from "../../constants";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

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

  const [initPage, setInitPage] = useState(0);

  const [audioFile, setAudioFile] = useState(null);
  const [currPage, setCurrPage] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const pageInput = new URLSearchParams(location.search).get("page");
  

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

  const fetchAudio = async (audioUrl) => {
    try {
      const res = await axios.get(audioUrl, { responseType: "blob" });
      const blob = new Blob([res.data], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      console.log(url);
      setAudioFile(url);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchChapterTime = async (studentId, chapterId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}chapterTime/getForChapterStudent`,
        {
          studentId,
          chapterId,
        }
      );
      console.log(res.data);
      console.log(pageInput);
      if(pageInput){
        setInitPage(pageInput - 1);
      }else{
        setInitPage(res.data.chapterTime?.page);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchChapter = async (chapterId) => {
    try {
      const res = await axios.get(`${BASE_URL}chapter/id/${chapterId}`);
      console.log(res.data);

      setChapter(res.data);
      fetchPdf(res.data.filePath ? SYNC_URL+"files/"+res.data.filePath : res.data.chapterUrl);
      if (res.data.audioUrl) {
        fetchAudio(res.data.audioUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [student, setStudent] = useState(null);

  const fetchStudent = async () => {
    const userId = localStorage.getItem("user_id");
    console.log(userId);
    try {
      const res = await axios.get(
        `${BASE_URL}student/getStudentByUserId/${userId}`
      );
      console.log(res.data);
      fetchChapterTime(res.data.studentDoc?._id, chapterId);
      setStudent(res.data.studentDoc);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (chapterId) fetchChapter(chapterId);
    fetchStudent();
    startAndStop();
  }, []);


  const [time, setTime] = useState(0);

  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime((prevTime) => prevTime + 1), 10);
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
  const milliseconds = time % 10;

  // Method to start and stop timer
  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  // Method to reset timer back to 0
  const reset = () => {
    setTime(0);
  };

  function getYouTubeID(url) {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/[^/]+\/|(?:v|e(?:mbed)?)\/|[^#]*[?&]v=|[^#]*#(?:[^/]*[?&]v=))|youtu\.be\/)([^"&?/ ]{11})/
    );
    return match && match[1];
  }

  const chapterTimeUpdateApi = async (reqBody) => {
    console.log("i am here");
    try {
      const res = await axios.post(`${BASE_URL}chapterTime/update`, reqBody);
      console.log(res.data);
      navigate("/mycourse");
    } catch (error) {
      console.log(error);
    }
  };

  const sendChapterUpdate = () => {
    startAndStop();
    const reqBody = {
      chapterId: chapterId,
      studentId: student?._id,
      time: seconds,
      page: currPage,
    };
    console.log(reqBody);
    chapterTimeUpdateApi(reqBody);
  };

  return (
    <>
      <div className="stopwatch-container flex justify-between items-center px-10 bg-[#140342] text-white py-5">
        <div>
          <p className="stopwatch-time">
            {hours}:{minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </p>
        </div>
        <div className="stopwatch-buttons flex justify-between w-56 whitespace-nowrap">
          <button
            className="stopwatch-button bg-green-800 px-5 py-2 rounded-full hover:bg-green-600"
            onClick={startAndStop}
          >
            {isRunning ? "Stop" : "Start"}
          </button>
          <button
            className="stopwatch-button bg-orange-500 px-5 py-2 rounded-full hover:bg-orange-300"
            onClick={sendChapterUpdate}
          >
            Submit Time
          </button>
        </div>
      </div>
      <div className="w-[100%] ">
        {/* <form>
        <br></br>
        <input
          type="file"
          className="form-control"
          onChange={handleFile}
        ></input>
        {pdfError && <span className="text-danger">{pdfError}</span>}
      </form> */}
        {chapter?.audioUrl ? (
          <AudioPlayer
            src={chapter?.audioUrl}
            showJumpControls={true}
            onPlay={(e) => console.log("onPlay")}
            onSeeked={(e) => console.log("Seeked")}
            onSeeking={(e) => console.log("Seeking")}
            // other props here
          />
        ) : (
          ``
        )}

        {/* {chapter?.videoUrl ? (
    <iframe
        title="Chapter Video"
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${getYouTubeID(chapter.videoUrl)}`}
        allowFullScreen
    ></iframe>
) : null} */}

        <div
          className="viewer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "800px",
            width: "100%",
            overflowY: "auto",
            marginBottom: "10px", 
          }}
        >
          {pdfFile && (
            <Worker workerUrl="/worker.js">
              <Viewer
                fileUrl={pdfFile}
                plugins={[defaultLayoutPluginInstance]}
                initialPage={initPage}
                onPageChange={(e) => setCurrPage(e.currentPage)}
              ></Viewer>
            </Worker>
          )}
          {!pdfFile && <>No file is selected yet</>}
        </div>
      </div>
    </>
  );
};

export default PDFViewer;
