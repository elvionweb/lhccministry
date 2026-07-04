const axios = require('axios');

async function testPaystack() {
  try {
    const response = await axios.post('https://api.paystack.co/checkout/request_inline', {
      key: "pk_test_b12fc2a603ebda27ed5966db993bd3cefb4e2a26",
      email: "test@test.com",
      amount: 500000,
      reference: `LHCC-${Date.now()}`,
      metadata: {
        custom_fields: [
          {
            display_name: "Full Name",
            variable_name: "full_name",
            value: "Test User"
          },
          {
            display_name: "Giving Type",
            variable_name: "giving_type",
            value: "Offering"
          }
        ]
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
}

testPaystack();
