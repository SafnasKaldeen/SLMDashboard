// app/api/query-history/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);
const dbName = "adhoc_analysis";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });

    const updates = await req.json();
    const objectId = new ObjectId(id);

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("query_history");

    const result = await collection.updateOne({ _id: objectId }, { $set: updates });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });

    const objectId = new ObjectId(id);

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("query_history");

    const result = await collection.deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
