const mongoose = require("mongoose");

async function dropIndex() {
  try {
    // Import the connection function
    const connectDb = require("./lib/db").default;

    await connectDb();

    // Drop the teamName_1 index
    await mongoose.connection.collection("teams").dropIndex("teamName_1");

    console.log(
      "✅ Successfully dropped teamName_1 index from teams collection"
    );
    process.exit(0);
  } catch (error) {
    console.error("❌ Error dropping index:", error.message);
    process.exit(1);
  }
}

dropIndex();
