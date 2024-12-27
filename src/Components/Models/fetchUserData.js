import axios from "axios";

const fetchUserData = async (token) => {
  try {
    const res = await axios.get("http://localhost:5001/api/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default fetchUserData;
