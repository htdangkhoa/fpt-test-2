import { createAsyncThunk } from "@reduxjs/toolkit";
import { Deta } from "deta";
import { customAlphabet } from "nanoid";

import { Employee } from "../interfaces/Employee";

const deta = Deta("c0t3njgt_SUwYKjV3xPEcnZRMHAEke1VAn1oJ1d8m");

const db = deta.Base("employees");

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 10);

export const getEmployees = createAsyncThunk("getEmployees", async () => {
  return db.fetch();
});

export const deleteEmployee = createAsyncThunk("deleteEmployee", async (id: string) => {
  return db.delete(id);
});

export const createOrUpdateEmployee = createAsyncThunk("createOrUpdateEmployee", async (employee: Employee) => {
  const { key, ...dataUpToDate } = employee;

  return db.put(dataUpToDate as any, key || nanoid());
});
