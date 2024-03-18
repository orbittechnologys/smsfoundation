import { useState, useEffect } from "react";
import useAuth from "../../Hooks/useAuth";

// Import Worker
import { Worker } from "@react-pdf-viewer/core";
// Import the main Viewer component
import { Viewer } from "@react-pdf-viewer/core";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
// default layout plugin
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// Import styles of default layout plugin
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useParams } from "react-router";
import axios from "axios";
import { BASE_URL } from "../../constants";

const PDFViewer = () => {
  // creating new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // pdf file onChange state
  const [pdfFile, setPdfFile] = useState(null);

  // pdf file error state
  const [pdfError, setPdfError] = useState("");

  const { chapterId } = useParams();

  const [chapter, setChapter] = useState(null);
  const [timer, setTimer] = useState(0);

  const { auth } = useAuth();
  console.log(auth);

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

  console.log(chapterId);

  const fetchChapter = async (chapterId) => {
    try {
      const res = await axios.get(`${BASE_URL}chapter/id/${chapterId}`);
      console.log(res.data);
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
    // console.log(selectedFile.type);
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

  useEffect(() => {
    if (pdfFile) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, []);

  const updateChapterTime = async (totalTime) => {
    const studentId = sessionStorage.getItem("user_id");
    const reqbody = {
      chapterId: chapterId,
      studentId: studentId,
      time: totalTime,
    };
    console.log(reqbody);
    try {
      const response = await axios.post(
        "http://52.172.149.201:4000/api/chapterTime/update",
        reqbody
      );
      console.log(response.data);
      console.log("Chapter time updated:", response.data);
    } catch (error) {
      console.error("Error updating chapter time:", error);
    }
  };

  return (
    <div className="container">
      {/* Upload PDF */}
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

        {/* we will display error message in case user select some file
        other than pdf */}
        {pdfError && <span className="text-danger">{pdfError}</span>}
      </form>

      {/* View PDF */}
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
        {/* render this if we have a pdf file */}
        {pdfFile && (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer
              fileUrl={pdfFile}
              plugins={[defaultLayoutPluginInstance]}
            ></Viewer>
          </Worker>
        )}

        {/* render this if we have pdfFile state null   */}
        {!pdfFile && <>No file is selected yet</>}
        {pdfFile && <div>Timer: {timer} seconds</div>}
      </div>

      {chapter && <p>Total Hours: {chapter.totalHours}</p>}
    </div>
  );
};

export default PDFViewer;
