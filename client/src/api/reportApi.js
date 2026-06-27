import axios from "axios";

const API=axios.create({
    baseURL:"http://localhost:5000/api",
});

export const uploadReport = async (file) => {
    const formData = new FormData();
    formData.append("file",file);

    const res = await API.post("/reports/analyze",formData,{
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res.data;
};