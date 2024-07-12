import ftp from "basic-ftp";

export const fetchDataFromFTP = async (filename: string) => {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    await client.access({
      host: "ftp.example.com",
      user: "username",
      password: "password",
      secure: false,
    });
    await client.downloadTo(`./${filename}`, `/path/to/json/files/${filename}`);
  } catch (err) {
    console.error(err);
  }
  client.close();
};
