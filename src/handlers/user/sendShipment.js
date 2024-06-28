const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const sendShipment = async (req, reply) => {
  const {
    name,
    mobileNumber,
    phoneNumber,
    emailAddress,
    line1,
    city,
    countryCode,
    zipCode,
    country,
    state,
    order,
  } = req.body;
  await prisma.shipment.create({
    data: { orderID: order.id, shipmentDate: new Date() },
  });
  try {
    const res = await fetch(
      "https://local-stg.epservices.ae/api/Shipments/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key":
            "23ba3fccc642a478c192e823f7c3d413:a51a45a8abf84994a19a1dfb0f044c4e",
          Password: "C175120",
        },
        body: JSON.stringify({
          weight: { value: 1000, unit: "Grams" },
          shipper: {
            contact: {
              name: "lavana",
              mobileNumber: "0506356566",
              phoneNumber: "041234567",
              emailAddress: "orders@sib.com",
              companyName: "lavana",
            },
            address: {
              line1: "Umm ",
              regionCode: null,
              city: "Dubai",
              cityCode: "DXB",
              state: "DXB",
              countryCode: "AE",
              zipCode: "00000",
              point: { latitude: null, longitude: null },
              countryName: "United Arab Emirates",
            },
            referenceNo1: "string",
            referenceNo2: "string",
          },
          consignee: {
            contact: {
              name: name,
              mobileNumber: mobileNumber,
              phoneNumber: phoneNumber,
              emailAddress: emailAddress,
              companyName: name,
            },
            address: {
              line1:line1,
              regionCode: "",
              city: city,
              cityCode: null,
              state: state,
              countryCode: countryCode,
              zipCode: zipCode,
              point: { latitude: "", longitude: "" },
              countryName:country,
            },
            referenceNo1: "",
            referenceNo2: "string",
          },
          dimensions: { length: 10, height: 10, width: 10, unit: "Meter" },
          account: { number: 177122 },
          productCode: "Domestic",
          serviceType: "None",
          printType: "AWBOnly",
          sendMailToSender: false,
          sendMailToReceiver: false,
          isInsured: true,
          customsDeclarations: [
            {
              reference: "string",
              description: "Medicine",
              countryOfOrigin: "AE",
              weight: 1000,
              dimensions: { length: 10, height: 10, width: 10 },
              quantity: 1,
              hsCode: "3004909",
              value: 250,
            },
          ],
          declaredValue: { amount: 250, currency: "AED" },
          numberOfPieces: 1,
          referenceNumber1: "",
          referenceNumber2: "",
          referenceNumber3: "",
          referenceNumber4: "",
          specialNotes: "",
          remarks: "",
          branchName: null,
          deliveryType: "DoorToDoor",
          contentType: "NonDocument",
          isCod: false,
          coDAmount: { amount: 0, currency: null },
        }),

        mode: "cors",
      }
    );
    const data = await res.json();
    console.log(data, "data");
  } catch (error) {
    console.log(error);
  }

  reply
    .status(200)
    .send({ message: "successfully registered the order", order });
};
module.exports = sendShipment;
