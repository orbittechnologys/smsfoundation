import { useState, useEffect } from "react";

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
      <div className="viewer"
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
      </div>
    </div>
  );
};

export default PDFViewer;
