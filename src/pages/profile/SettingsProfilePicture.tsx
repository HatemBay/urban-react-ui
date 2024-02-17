import {
  Avatar,
  AvatarBadge,
  AvatarBadgeProps,
  AvatarProps,
  VStack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { User } from "../../data/types";
import { IoIosClose } from "react-icons/io";
import imageCompression from "browser-image-compression";

interface ISettingsProfilePictureProps extends AvatarProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setImageModified: React.Dispatch<React.SetStateAction<boolean>>;
  avatarBadgeProps?: AvatarBadgeProps; // Properties for AvatarBadge
}

/**
 * SettingsProfilePicture component for managing user profile pictures in settings.
 *
 * @component
 *
 * @param {Object} props - The component's props.
 * @param {User} props.user - The user object.
 * @param {React.Dispatch<React.SetStateAction<User>>} props.setUser - The function to set the user state.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setImageModified - The function to set the image modification state.
 * @param {AvatarBadgeProps} [props.avatarBadgeProps] - Properties for AvatarBadge.
 * @param {AvatarProps} props.avatarProps - Properties for Avatar (without prefix).
 *
 * @returns {JSX.Element} The rendered SettingsProfilePicture component.
 */
const SettingsProfilePicture = ({
  user,
  setUser,
  setImageModified,
  avatarBadgeProps,
  ...avatarProps
}: ISettingsProfilePictureProps): React.JSX.Element => {
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
        title="profile picture"
        size={"2xl"}
        name={user.username}
        src={
          `${user.profilePicture}` && `${user.profilePicture}` !== ""
            ? `data:image/png;base64,${user.profilePicture}`
            : user.googleProfile?.picture
        }
        _hover={{
          cursor: "pointer",
        }}
        onClick={selectProfilePicture}
        {...avatarProps}
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
              {...avatarBadgeProps}
            >
              <IoIosClose />
            </AvatarBadge>
          )}
      </Avatar>
    </VStack>
  );
};

export default SettingsProfilePicture;
