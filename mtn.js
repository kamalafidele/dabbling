import express from "express";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const momoRouter = express.Router();

const momoCommonUrl = `https://mtndeveloperapi.portal.mtn.co.rw/collection`;
const subscriptionKey = process.env.MOMO_API_SUBSCRIPTION_KEY;
const apiKey = process.env.MOMO_API_FORMATTED_KEY;

/**
 *
 * Get a momo token
 */
export const createMomoToken = async () => {
  try {
    return axios.post(
      `${momoCommonUrl}/token/`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": `${subscriptionKey}`,
          Authorization: `Basic ${apiKey}`,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};

/**
 * request to pay
 *
 * */

export const requestToPay = async (token, paymentData) => {
  try {
    if (!token) {
      return;
    }
    const body = {
      amount: paymentData.amount,        // STRING
      currency: "RWF",
      externalId: paymentData.referenceId,      //  UUID
      payer: {
        partyIdType: "MSISDN",
        partyId: paymentData.phoneNumber,       // STRING
      },
      payerMessage: paymentData.payerMessage,
      payeeNote: "Payment for order",
    };

    return axios.post(`${momoCommonUrl}/v1_0/requesttopay`, body, {
      headers: {
        "X-Reference-Id": paymentData.referenceId,
        "X-Target-Environment": "mtnrwanda",
        "Ocp-Apim-Subscription-Key": subscriptionKey,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return error;
  }
};

/**
 *  get transaction status
 *
 */
export const getTransactionStatus = async (token, referenceId) => {
  try {
    if (!token) {
      return;
    }
    return axios.get(`${momoCommonUrl}/v1_0/requesttopay/${referenceId}`, {
      headers: {
        "X-Reference-Id": referenceId,      // UUID
        "X-Target-Environment": "mtnrwanda",
        "Ocp-Apim-Subscription-Key": subscriptionKey,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export default momoRouter;