import { Avatar, AvatarBadge, VStack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { User } from "../../data/types";
import { IoIosClose } from "react-icons/io";
interface Props {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setImageModified: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  title: string;
  size: string;
  profilePicture: string | undefined;
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
  name,
  title,
  size,
  profilePicture,
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

  const changeProfilePicture = (e: any) => {
    if (e.target.files[0] && e.target.files[0] !== null) {
      const img = e.target.files[0];
      if (img) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = (reader.result as string).split(",")[1];
          setUser({ ...user, profilePicture: base64String });
          setImageModified(true);
        };
        reader.readAsDataURL(img);
      }
    }
  };

  return (
    <VStack p={4} minW={"25vw"} spacing={4} alignSelf={"center"}>
      <input
        type="file"
        accept="image/*"
        ref={profilePictureChangeRef}
        style={{ display: "none" }}
        onChange={changeProfilePicture}
      />
      <Avatar
        key={avatarKey}
        name={name}
        src={
          `${user?.profilePicture}` && `${user?.profilePicture}` !== ""
            ? `data:image/png;base64,${user?.profilePicture}`
            : user?.googleProfile?.picture
        }
        title={title}
        size={size}
        _hover={{
          cursor: "pointer",
        }}
        onClick={selectProfilePicture}
      >
        {profilePicture !== "_" && (
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
