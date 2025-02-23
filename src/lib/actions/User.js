import User from "../models/user.model";
import { connect } from "../mongodb/mongoose";

export const createOrUpdateUser = async (
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
  username
) => {
  try {
    await connect();
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          imageUrl: image_url,
          emailAddresses: email_addresses,
          username: username,
        },
      },
      { upsert: true, new: true }
    );
    return user;
  } catch (error) {
    throw new Error(`Error creating or updating user: ${error}`);
  }
};

export const deleteUser = async (id) => {
  try {
    await connect();
    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.log("error deleting user", error);
  }
};
