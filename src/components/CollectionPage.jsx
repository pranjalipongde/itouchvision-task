import React, { useEffect, useState } from "react";

const CollectionPage = () => {
  const [postcode, setPostcode] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [collections, setCollections] = useState([]);

  console.log(postcode);
  const fetchAddresses = async () => {
    try {
      const response = await fetch(
        `https://iweb.itouchvision.com/portal/itouchvision/kmbd_demo/address`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            P_GUID: "FF93E12280E5471FE053A000A8C08BEB",
            P_POSTCODE: postcode,
          },
        }
      );
      const data = await response.json();
      setAddresses(data.addresses);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const fetchCollections = async (selectedUPRN) => {
    try {
      const response = await fetch(
        `https://iweb.itouchvision.com/portal/itouchvision/kmbd_demo/collectionDay`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            P_GUID: "FF93E12280E5471FE053A000A8C08BEB",
            P_UPRN: selectedUPRN,
            P_CLIENT_ID: 130,
            P_COUNCIL_ID: 260,
          },
        }
      );
      const data = await response.json();
      setCollections(data.collections);
    } catch (error) {
      console.error("Error fetching collection:", error);
    }
  };

  const handlePostcodeChange = (e) => {
    setPostcode(e.target.value);
  };

  const handleAddressSelect = (e) => {
    const selectedUPRN = e.target.value;
    setSelectedAddress(selectedUPRN);
    fetchCollections(selectedUPRN);
  };

  useEffect(() => {
    if (postcode) {
      fetchAddresses();
    }
  }, [postcode]);

  return (
    <div>
      <div className="mb-6">
        <label htmlFor="postcode" className="block text-sm font-medium mb-1">
          Enter a postcode
        </label>
        <input
          id="postcode"
          className="h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="For example SW1A 2AA"
          value={postcode}
          onChange={handlePostcodeChange}
        />
        <p className="mt-1 text-sm">{postcode}</p>
      </div>
      <div className="mb-6">
        <label htmlFor="address" className="block text-sm font-medium mb-1">
          Select an address
        </label>
        <select
          id="address"
          className="h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={selectedAddress}
          onChange={handleAddressSelect}
        >
          <option value="">Select an address</option>
          {addresses.map((address) => (
            <option key={address.UPRN} value={address.UPRN}>
              {address.address}
            </option>
          ))}
        </select>
        <button className="inline-block mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Clear address and start again
        </button>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Your next collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {collections && collections.length > 0 ? (
            collections.map((collection) => (
              <div
                key={collection.day}
                className={`bg-${collection.color} p-4 text-white rounded-md`}
              >
                <h3 className="font-bold">{collection.type}</h3>
                <p className="text-2xl my-2">{collection.day}</p>
                {collection.followingDay && (
                  <p>followed by {collection.followingDay}</p>
                )}
              </div>
            ))
          ) : (
            <p>No collections found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
