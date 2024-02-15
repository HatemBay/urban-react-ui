import { Avatar, AvatarBadge, VStack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { User } from "../../data/types";
import { IoIosClose } from "react-icons/io";
import imageCompression from "browser-image-compression";
interface Props {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setImageModified: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  size: string;
}

/**
 * Renders a profile picture component with the ability to change and remove the profile picture.
 *
 * @param {Props} user - The user object
 * @param {function} setUser - The function to update the user object
 * @param {function} setImageModified - The function to update the image modification status
 * @param {string} name - The name of the user
 * @param {string} title - The title of the user
 * @param {string} size - The size of the profile picture
 * @param {string} profilePicture - The profile picture of the user
 * @return {JSX.Element} The profile picture component
 */
const SettingsProfilePicture = ({
  user,
  setUser,
  setImageModified,
  title,
  size,
}: Props): JSX.Element => {
  const [avatarKey, setAvatarKey] = useState(0);
  const profilePictureChangeRef = useRef<any>();

  const removeProfilePicture = (e: any) => {
    e.stopPropagation();
    setImageModified(true);
    setUser({ ...user, profilePicture: "_" });
    setAvatarKey((prevKey) => prevKey + 1);
  };

  const selectProfilePicture = (e: any) => {
    profilePictureChangeRef.current.click();
  };

  const changeProfilePicture = async (e: any) => {
    if (e.target.files[0] && e.target.files[0] !== null) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      const img = e.target.files[0];
      if (img) {
        try {
          const compressedFile = await imageCompression(img, options);
          let base64String = await imageCompression.getDataUrlFromFile(
            compressedFile
          );
          const reader = new FileReader();
          reader.onloadend = () => {
            base64String = base64String.split(",")[1];

            setUser({ ...user, profilePicture: base64String });
            setImageModified(true);
          };
          reader.readAsDataURL(compressedFile);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  /* If the user chooses a profile picture then removes it then chooses it again, the picture would still be 
  stored in the input which will prevent the onChange from triggering and thus not showing the chosen image again,
  therefore we need to clear the input */
  const emptyValues = (e: any) => {
    e.target.value = "";
  };

  return (
    <VStack p={4} minW={"25vw"} spacing={4} alignSelf={"center"}>
      <input
        type="file"
        accept="image/*"
        ref={profilePictureChangeRef}
        style={{ display: "none" }}
        onChange={changeProfilePicture}
        onClick={emptyValues}
      />
      <Avatar
        key={avatarKey}
        name={user.username}
        src={
          `${user.profilePicture}` && `${user.profilePicture}` !== ""
            ? `data:image/png;base64,${user.profilePicture}`
            : user.googleProfile?.picture
        }
        title={title}
        size={size}
        _hover={{
          cursor: "pointer",
        }}
        onClick={selectProfilePicture}
      >
        {user.profilePicture !== "_" &&
          !(user?.googleProfile === null && user.profilePicture === null) && (
            <AvatarBadge
              mr={2}
              title="remove profile picture"
              borderWidth={"5px"}
              boxSize="0.7em"
              bg="papayawhip"
              textColor={"black"}
              _hover={{
                filter: "brightness(1.3)",
                textColor: "gray.700",
              }}
              onClick={removeProfilePicture}
            >
              <IoIosClose />
            </AvatarBadge>
          )}
      </Avatar>
    </VStack>
  );
};

export default SettingsProfilePicture;
