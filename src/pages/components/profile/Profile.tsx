import { useGetProfileQuery } from "../../../redux/features/profile/profileApi";
import "./Profile.css";

const Profile = () => {
  const { data } = useGetProfileQuery({});
  const profileData = data?.data || "";
  return (
    <div className="profileDiv">
      <p style={{ margin: "0", fontSize: "22px", fontWeight: "600" }}>
        Profile
      </p>
      <div className="profileImgDiv">
        <img src={profileData?.profileImg} />
      </div>
      <div className="profileNameDiv">
        <label>Your name</label>
        {/* <br /> */}
        <p
          style={{
            margin: "0",
            marginTop: "15px",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          {profileData?.name}
        </p>
        {/* <label>Your name</label>
        <br />
        <input /> */}
      </div>
      <div className="profileNameDiv">
        <label>Your email</label>
        {/* <br /> */}
        <p
          style={{
            margin: "0",
            marginTop: "15px",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          {profileData?.name}
        </p>
        {/* <label>Your name</label>
        <br />
        <input /> */}
      </div>
    </div>
  );
};

export default Profile;
