"use server";

export const createOrder = async (orderData: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
    
    // We should get success, message, and data
    const data = await res.json();
    return data;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const getRiderDeliveries = async (token: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders/rider/deliveries`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const updateDeliveryStatus = async (orderId: string, status: string, token: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders/${orderId}/delivery-status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
