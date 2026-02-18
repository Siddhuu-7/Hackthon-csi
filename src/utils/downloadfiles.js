  import axios from "axios";
  const handleDownload = async (teamName) => {
    
    try {
      const res = await axios.get(
        `http://localhost:6961/download-ppt?teamName=${teamName}`,
        { responseType: "blob" }
      );

      const contentDisposition = res.headers["content-disposition"];
      let backendFileName =teamName?`${teamName}Udbhav2k26.pptx`:"Udbhav2k26.pptx";

      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match && match[1]) {
          backendFileName = match[1];
        }
      }

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = backendFileName;
      document.body.appendChild(link);

      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
    }
  };
  export default handleDownload