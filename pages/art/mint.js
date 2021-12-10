import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
// import Web3 from "web3";
// const LS_KEY = "login-with-metamask:auth";
// import jwtDecode from "jwt-decode";
// import ConfettiGif from "../../components/layout/confettigif";
// import { faPlus, faMinus, faChevronCircleLeft, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar";
// import { uploadFileToPinata } from "../../utils/pinata";


// let Abijson = require("../../erc721_abi.json");
// let web3: Web3 | undefined = undefined; // Will hold the web3 instance
// interface JwtDecoded {
//   payload: {
//     id: string;
//     PublicAddress: string;
//   };
// }
export default function Mint({ AllowedAddresses, bxmiPrice }) {

  const [imgUrl, setImgUrl] = useState("")
  const [onSaleInput, setOnSaleInput] = useState("active")
  const [onAuctionInput, setOnAuctionInput] = useState("")


  const routers = useRouter()

  const ImgUploadhandle = (e) => {
    setImgUrl(e.target.value)
    console.log("valuee", e.target.value)
  }

  const onSaleHandler = () => {
    setOnSaleInput("active")
    setOnAuctionInput("")
    setMinted(true);
    setAuctioned(false);

  }

  const onAuctionHandler = (e) => {
    setOnAuctionInput("active")
    setOnSaleInput("")
    setMinted(false);
    setAuctioned(true);
  }

  const switchNft = (e) => {
    if (e.target.checked === true) {
      setMinted(true);
    } else {
      setMinted(false);
    }
  };

  const switchAuction = (e) => {
    if (e.target.checked === true) {
      setAuctioned(true);
    } else {
      setAuctioned(false);
    }
  };


  const firstRender = useRef(true);
  const [disable, setDisabled] = useState(true);

//   useEffect(() => {
//     try {
//       // Access token is stored in localstorage
//       const ls = (window as any).localStorage.getItem(LS_KEY);
//       const {
//         payload: { id, PublicAddress },
//       } = jwtDecode<JwtDecoded>(ls);
//       setPA(PublicAddress);
//       setUserId(id);
//       console.log(id);
//     } catch (err) {
//       alert("install & login Metamask");
//       router.push("/");
//     }
//   }, []);

  const router = useRouter();
  const [files, setFiles] = useState([]);

  const [loading, setLoading] = useState(false);

  const [physical, setPhysical] = useState(false);
  const [auctioned, setAuctioned] = useState(false);

  const [publicAddress, setPA] = useState("");
  const [name, setName] = useState("");
  const [Price, setPrice] = useState("0");
  const [Location, setLocation] = useState("");
  const [media, setMedia] = useState(undefined);
  const [mediaCertificate, setMediaCertificate] = useState(undefined);
  const [Description, setDescription] = useState("");
  const [Category, setCategory] = useState("");

  const [userId, setUserId] = useState("");
  const [animationGif, setAnimationGif] = useState(false);
  const [startAuction, setStartAuction] = useState(new Date());
  const [endAuction, setEndAuction] = useState(new Date());
  // const [unixtimeStamp, setUnixTimestamp] = useState("");

  // const [endAuction, setEndAuction] = useState("");

  const [minted, setMinted] = useState(false);

  const [addressWarningAlert, setAddressWarningAlert] = useState("");
  const [formError, setFormError] = useState({
    nameError: false,
    mediaError: false,
    descriptionError: false,
    categoryError: false,
    priceError: false,
    locationError: false,
  });

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    setDisabled(formValidation());
  }, [media, name, Description, Category, Price, Location]);

  const formValidation = () => {
    if (media == "" || media == undefined) {
      setFormError({ ...formError, mediaError: true });
      return true;
    } else if (name === "") {
      setFormError({ ...formError, nameError: true });
      return true;
    } else if (Description == "") {
      setFormError({ ...formError, descriptionError: true });
      return true;
    } else if (Category == "") {
      setFormError({ ...formError, categoryError: true });
      return true;
    } else if (Location == "") {
      setFormError({ ...formError, locationError: true });
      return true;
    } else if (Price == "0" || !Price || parseFloat(Price) < 0) {
      setFormError({ ...formError, priceError: true });
      return true;
    } else {
      setFormError({
        nameError: false,
        mediaError: false,
        descriptionError: false,
        categoryError: false,
        priceError: false,
        locationError: false,
      });
      return false;
    }
  };

  const alertCloseHandler = () => {
    setAddressWarningAlert("");
  };

  const switchPhysical = (e) => {
    if (e.target.checked === true) {
      setPhysical(true);
    } else {
      setPhysical(false);
    }
  };




  // const unixConverter = (e) => {
  //   const date = new Date(e.target.value);
  //   const unixTimeStamp = Math.floor(date.getTime() / 1000);
  //   setUnixTimestamp(unixTimeStamp.toString())
  // }

  // console.log("unixTimeStamp", endAuction)

  // var TMintId = "";
  // var TContractAddress = "";
  // var THash = "";
  // var AuctionHash = "";
  // var AuctionContractAddress = "";


  // const imageUpload = async () => {
    // const data = new FormData();
    // data.append("file", media);
    // data.append("upload_preset", "bxmi-peset");
    // data.append("cloud_name", "bxmi-io");
    // const res = await fetch(
    //   "	https://api.cloudinary.com/v1_1/bxmi-io/image/upload",
    //   {
    //     method: "POST",
    //     body: data,
    //   }
    // );
    // const res2 = await res.json();
    // return res2.url;
  // };
  // const CertificateUpload = async () => {
    // const data = new FormData();
    // data.append("file", mediaCertificate);
    // data.append("upload_preset", "bxmi-peset");
    // data.append("cloud_name", "bxmi-io");
    // const res = await fetch(
    //   "	https://api.cloudinary.com/v1_1/bxmi-io/image/upload",
    //   {
    //     method: "POST",
    //     body: data,
    //   }
    // );
    // const res2 = await res.json();
    // return res2.url;
  // };
  // const artlog = async (_id) => {
  //   const res = await fetch("/api/artlogs/", {
  //     body: JSON.stringify({
  //       ArtId: _id,
  //       ArtistId: userId,
  //       Description: "NFT was minted",
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     method: "POST",
  //   });
  //   const res2 = await res.json();
  //   router.push(`/art/${_id}`);
  // };
  // const updateNft = async (_id, TMintId1, THash1, TContractAddress1) => {
  //   const res = await fetch(`/api/art/${_id}`, {
  //     body: JSON.stringify({
  //       NFTId: TMintId1,
  //       MintTransaction: THash1,
  //       ContractAddress: TContractAddress1,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     method: "PUT",
  //   });
  //   const res2 = await res.json();
  //   console.log("Updated NFT", res2);

  //   artlog(_id);
  // };
//   const handleSignMessage = async (_PublicAddress, ArtName) => {
//     try {
//       if (!(window as any).ethereum) {
//         window.alert("Please install MetaMask first.");
//         return;
//       }
//       if (!web3) {
//         try {
//           await (window as any).ethereum.enable();
//           web3 = new Web3((window as any).ethereum);
//         } catch (error) {
//           window.alert("You need to allow MetaMask.");
//           return;
//         }
//       }
//       const signature = await web3!.eth.personal.sign(
//         `I am minting my Art: ${ArtName}`,
//         _PublicAddress,
//         "" // MetaMask will ignore the password argument here
//       );

//       return { signature };
//     } catch (err) {
//       throw new Error(
//         err
       
//       );
//     }
//   };
  // const mintArt = async (event) => {
  //   event.preventDefault(); // don't redirect the page
    // if (formValidation()) {
    //   console.log("Form Validation Failed");
    //   return;
    // }
    // setLoading(true);
    // if (physical) {
    //   console.log("Pysical");
    //   const _pa = publicAddress.toUpperCase();
    //   const uppercased = AllowedAddresses.map((AllowedAddresses) =>
    //     AllowedAddresses.toUpperCase()
    //   );

    //   var arraycontainsturtles = uppercased.indexOf(_pa) > -1;
    //   if (!arraycontainsturtles) {
    //     console.log(arraycontainsturtles);
    //     console.log("No I am not there");
    //     setAddressWarningAlert("active");

    //     setTimeout(
    //       function () {
    //         setAddressWarningAlert("");
    //       }.bind(this),
    //       3000
    //     );

    //     console.log(_pa);
    //     console.log(AllowedAddresses);
    //     return;
    //   } else {
    //     console.log("yes I am  there");
    //   }
    // }
    // const Url = await imageUpload();
    // const Url = media ? await uploadFileToPinata(media) : undefined;
    // let UrlCertificate = "";
    // if (physical) {
      // UrlCertificate = await CertificateUpload();
    // }
    //
    // const body = {
    //   name,
    //   Description,
    //   Url,
    //   UrlCertificate,
    //   PriceBNB: Price,
    //   Category,
    //   OwnerId: userId,
    //   CreatorId: userId,
    //   Physical: physical,
    //   Auctioned: auctioned,
    //   StartAuction: startAuction,
    //   EndAuction: endAuction,
    //   Minted: minted,
    //   Location,
    // };

    // console.log(body, "body")
    // const res = await fetch("/api/art", {
    //   body: JSON.stringify(body),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   method: "POST",
    // });

    // const result = await res.json();
    // console.log(result._id);
    // const Artid = result._id;
    // setLoading(false);

    // if (minted == true) {
    // try {
    //   if (!(window as any).ethereum) {
    //     window.alert("Please install MetaMask first.");
    //     return;
    //   }
    //   if (!web3) {
    //     try {
    //       await (window as any).ethereum.enable();
    //       web3 = new Web3((window as any).ethereum);
    //     } catch (error) {
    //       window.alert("You need to allow MetaMask.");
    //       return;
    //     }
    //   }

    //   var contract = await new web3!.eth.Contract(
    //     Abijson,
    //     process.env.ERC721Address
    //   );

    //   const _tokenURI = Url;
    //   const _toAddress = publicAddress;
    //   const _price = web3.utils.toWei(Price, "ether");

    //   // setLoading(true);
    //   const mint = await contract.methods
    //     .mint(_tokenURI, _toAddress, _price)
    //     .send({ from: _toAddress })
    //     .on("receipt", function (hash) {
    //       // router.push(`/art/${_id}`);
    //       console.log("Hash", hash);
    //     });

    //   setAnimationGif(true);
    //   setLoading(false);

    //   TMintId = mint.events.Minted.returnValues.nftID;

    //   THash = mint.events.Minted.transactionHash;

    //   TContractAddress = mint.events.Minted.address;

    //   if (onAuctionInput == "active") {

    //     const _tokenId = TMintId;

    //     const _step = 0;

    //     const _startBid = web3.utils.toWei(Price, "ether");

    //     const _bidMaxTime = unixtimeStamp;

    //     const _tokenPayment = false;

    //     const Auctionstart = await contract.methods

    //       .Auctionstart(_tokenId, _step, _startBid, _bidMaxTime, _tokenPayment)

    //       .send({ from: publicAddress })

    //       .on("receiptAuction", function (hash) {

    //         console.log("AuctionHash", hash);

    //       });

    //     AuctionHash = Auctionstart.events.Start.transactionHash;

    //     AuctionContractAddress = Auctionstart.events.Start.address;

    //   }



    //   updateNft(Artid, TMintId, THash, TContractAddress);

    //   setTimeout(function () {
    //     // router.push(`/art/${_id}`)
    //   }, 3000);

    // }

    // catch (err) {
    //   throw new Error(
    //     err
        // 'You need to sign the message to be able to log in.'
    //   );
    // }
    //  else {
    //   const signature = await handleSignMessage(publicAddress, name);
    //   console.log(signature.signature);
    //   try {
    //     //Get User Email By Public Address easily
    //     const url = `${process.env.Baseurl}/api/profile/${publicAddress}`;
    //     const resArtist = await fetch(url);
    //     const artistData = await resArtist.json();
    //     sendEmail(artistData.email);
    //   }
    //   catch (err) {
    //     console.log(err);
    //   }
    //   setAnimationGif("active");

    // }
  // };

  // const sendEmail = async (_email) => {
  //   const url = `${process.env.Baseurl}/api/mail`;
  //   const res = await fetch(url, {
  //     body: JSON.stringify({
  //       email: _email,
  //       subject: "You Just Minted " + name + " on BxmiNFT.io",
  //       html:
  //         "Hello From BitXmi your Item is listed on BxmiNFT.io " +
  //         name +
  //         " " +
  //         Description,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     method: "POST",
  //   });
  //   const status = await res.json();
  // };

  return (
    <>

<Navbar/>
<div class="app-content">
      <section className="mint-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-7 img-upload-col">

              <div className="img-uploader text-center">

                <div className="img-uploader-desc">
                  {media ?
                    <img
                      className=" w-full h-full m-3 object-cover"
                      src={
                        media
                          ? URL.createObjectURL(media)
                          : "/images/userplaceholder.png"
                      }
                      width="100"
                    />
                    :
                    <>
                    </>}

                </div>

                <div className="input-group upload-btn-col text-center">
                  <input
                    type="file"
                    className="form-control d-none"
                    id="inputGroupFile02"
                    accept="image/*"
                    onChange={(e) => {
                      setMedia(e.target.files[0]);
                      setFormError({ ...formError, mediaError: false });
                    }}
                  />
                  <label className="input-group-text upload-btn btn" htmlFor="inputGroupFile02">Add More</label>
                </div>
              </div>

              {/* <ul>
                <li>
                  <div className="mitlipleImages">
                    <div className="input-group upload-btn-col text-center">
                      <input type="file" className="form-control d-none" id="inputGroupFile02" />
                      <label className="input-group-text upload-btn btn">Add More</label>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="mitlipleImages">
                    <div className="input-group upload-btn-col text-center">
                      <input type="file" className="form-control d-none" id="inputGroupFile02" />
                      <label className="input-group-text upload-btn btn" htmlFor="inputGroupFile02">Add More</label>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="mitlipleImages">
                    <div className="input-group upload-btn-col text-center">
                      <input type="file" className="form-control d-none" id="inputGroupFile02" />
                      <label className="input-group-text upload-btn btn" htmlFor="inputGroupFile02">Add More</label>
                    </div>
                  </div>
                </li>

                <li>
                  <div className="mitlipleImages">
                    <div className="input-group upload-btn-col text-center">
                      <input type="file" className="form-control d-none" id="inputGroupFile02" />
                      <label className="input-group-text upload-btn btn" htmlFor="inputGroupFile02">Add More</label>
                    </div>
                  </div>
                </li>
              </ul> */}

            </div>

            <div className="col-12 col-md-5 mint-it-col">




              <form onSubmit={(e) => mintArt(e)}>
                {!loading ? (
                  <>
                    <label>Type</label>
                    <nav className="nav-tabs-col">
                      <div className="nav nav-tabs d-flex align-items-center " id="nav-tab" role="tablist">
                        <button className="nav-link active me-4" onClick={onSaleHandler} id="nav-profile-tab1" data-bs-toggle="tab" data-bs-target="#nav-tabContent1" type="button" role="tab" aria-controls="nav-tabContent1" aria-selected="true">
                          <img src="/image/tag-g.png" className="img-fluid" />
                          <img src="/image/sale-selected.png" className="img-fluid" />
                                        Sale
                                        </button>
                        <button className="nav-link" onClick={onAuctionHandler} id="nav-profile-tab1" data-bs-toggle="tab" data-bs-target="#nav-profile1" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                          <img src="/image/auction.png" className="img-fluid" />
                          <img src="/image/auction-selected.png" className="img-fluid" />
                                        Auction
                                        </button>

                      </div>
                    </nav>


                    {/* <div className="from-group">
                      <label className="form-label"> Upload Thunmbnail</label>
                      <div className="input-group upload-track  text-center">
                        <input type="file" className="form-control" id="inputGroupFile03" />
                        <input type="text" className="form-control" />
                        <span>Choose File</span>
                        <label className="input-group-text upload-btn btn" htmlFor="inputGroupFile03">Upload</label>
                      </div>
                    </div> */}

                    <div className="from-group">
                      <label className="form-label">NFT Title</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        onChange={(e) => {
                          {
                            setName(e.target.value);
                            setFormError({ ...formError, nameError: false });
                          }
                        }}
                      />
                      {formError.nameError && (
                        <p className="text-danger">*Name is required</p>
                      )}
                    </div>

                    {/* <div className="from-group">
                  <label className="form-label">Genre</label>
                  <select className="form-select me-3" aria-label="Default select example">
                    <option selected></option>
                    <option value={1}>One</option>
                    <option value={2}>Two</option>
                    <option value={3}>Three</option>
                  </select>
                </div> */}

                    <div className=" from-group text-area">
                      <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        placeholder=""
                        onChange={(e) => {
                          {
                            setDescription(e.target.value);
                            setFormError({
                              ...formError,
                              descriptionError: false,
                            });
                          }
                        }}
                      ></textarea>
                      {formError.descriptionError && (
                        <p className="text-danger">
                          *Description is required
                        </p>
                      )}

                    </div>

                    <div className="from-group">
                      <label className="form-label">Location</label>
                      <input type="text" className="form-control" placeholder=""
                        onChange={(e) => {
                          {
                            setLocation(e.target.value);
                            setFormError({
                              ...formError,
                              locationError: false,
                            });
                          }
                        }} />
                    </div>

                    {
                      onSaleInput == "active" ?
                        <div className="from-group">
                          <label className="form-label">Price</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            onChange={(e) => {
                              {
                                setPrice(e.target.value);

                                setFormError({
                                  ...formError,
                                  priceError: false,
                                });
                              }
                            }}
                          />
                        </div>
                        :
                        <>
                        </>}

                    {
                      onAuctionInput == "active" ?
                        <>
                          <div className="from-group">
                            <label className="form-label">Starting Price</label>
                            <input type="number" className="form-control" placeholder=""
                              step="0.000000000000000001"
                              min="0"
                              onChange={(e) => {
                                {
                                  setPrice(e.target.value);
                                  setFormError({
                                    ...formError,
                                    priceError: false,
                                  });
                                }
                              }}
                            />
                          </div>

                          

                          <div className="from-group">
                            <label className="form-label">Expiration Date</label>
                            <input type="datetime-local" className="form-control" placeholder="" min={(new Date()).toString()}
                              onChange={(e) => {
                                setEndAuction(new Date(e.target.value));
                              }}
                              // onBlur={unixConverter} 
                              />
                          </div>
                        </>
                        :
                        <>
                        </>
                    }

                    {/* <div className="from-group">
                      <label className="form-label">Royalties</label>
                      <input type="text" className="form-control" placeholder="" />
                    </div> */}

                    <div className="d-flex justify-content-between service-fee-col justify-between">
                      <div className="text-sm font-medium  mb-4 md:mb-0 ">
                        <p>Service Fee</p>
                        <p>You'll recieve</p>
                      </div>
                      <div className="text-sm font-medium  font-xl mb-4 md:mb-0">
                        <p>2.5 </p>
                      </div>
                    </div>

                    <div className="from-group">
                      <button type="submit" className="btn mint-btn"> Mint It!</button>
                    </div>
                  </>

                ) : (
                  <div className="col-12 loadercol text-center">
                    {" "}
                    <h1>Please Stay on Page!</h1>
                    <p>Your transaction is processing on Blockchain</p>
                    <div
                      className="flex  text-center item-center "
                      style={{ margin: "0px auto" }}
                    >
                      <Image
                        src="/simpleLoader.gif"
                        alt="Picture of the author"
                        width={250}
                        height={250}
                      />
                    </div>
                  </div>
                )}

              </form>
            </div>

          </div>
        </div>
      </section>

      {/* animation  gif code here */}
      {/* {animationGif && (
        <ConfettiGif animationTittle="Congratulations!!" />
      )} */}
      </div>
    </>
  );
}

// export async function getServerSideProps() {

//   const Arturl = `${process.env.Baseurl}/api/adminaddress`;
//   const Artres = await fetch(Arturl);
//   const Artdata = await Artres.json();

//   return {
//     props: {
//       AllowedAddresses: Artdata,

//     },
//   };
// }
