
import { useGetProfileQuery } from "../../../redux/features/profile/profileApi";
import "./Profile.css";

const Profile = () => {
  const { data } = useGetProfileQuery({});
  const profileData = data?.data || "";
  console.log(profileData);

  return (
    <div className="profileDiv">
      <p style={{ margin: "0", fontSize: "22px", fontWeight: "600" }}>
        Profile
      </p>
      <div className="profileImgDiv">
        {
          profileData?.profileImg ? <img src={profileData?.profileImg} /> : <>
            <svg
              className="subManuBigProfileIcon"
              xmlns="http://www.w3.org/2000/svg"
              width={190}
              height={195}
              viewBox="0 0 448 512"
            >
              <path
                d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"
                fill="rgb(92, 92, 92)"
              />
            </svg>
          </>
        }
      </div>
      <div className="profileNameDiv">
        <label>Your name</label>
        <p
          style={{
            margin: "0",
            marginTop: "7px",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          {profileData?.name}
        </p>
      </div>
      <div className="profileNameDiv">
        <label>Your email</label>
        <p
          style={{
            margin: "0",
            marginTop: "7px",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          {profileData?.email}
        </p>
      </div>
      <div className="profileNameDiv">
        <label>Your Phone</label>
        <p
          style={{
            margin: "0",
            marginTop: "7px",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          {profileData?.user?.phone}
        </p>
      </div>

      <div className="profileNameDiv">
        <label>About</label>
        <p
          style={{
            margin: "0",
            marginTop: "7px",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          {profileData?.about}
        </p>
      </div>
    </div>
  );
};

export default Profile;
