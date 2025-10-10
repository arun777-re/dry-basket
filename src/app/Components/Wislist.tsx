"use client";

import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Pagination from "../_components/Pagination";
import Spinner from "../_components/Spinner";
import useWishlistHook from "@/hooks/useWhislistHook";
import WishCard from "../_components/card/WishCard";

const Wishlist = () => {
  const { getWishlist, wishlist, loading } = useWishlistHook();
  const router = useRouter();

  const [page, setPage] = React.useState<number>(1);
  const limit = 10;

  const query = { page, limit };

  React.useEffect(() => {
    (async () => {
      await getWishlist({ query });
    })();
  }, [page, limit]);

  const hasNextPage = !!wishlist?.hasNextPage;
  const hasPrevPage = !!wishlist?.hasPrevPage;

  if (loading) return <Spinner />;

  if (!wishlist?.data || wishlist.data.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <p className="text-gray-600 text-center  font-medium">
          No items found — start adding to your wishlist!
        </p>
      </div>
    );

  return (
    <TabsContent value="wishlist" className="px-0">
      <Card className="shadow-md rounded-2xl border border-gray-100">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl font-semibold text-gray-800">
             Wishlist
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 max-h-[70vh] overflow-y-auto px-2 sm:px-6">
          {wishlist.data.map((item) => (
            <WishCard key={item.productId._id} data={item.productId} query={query} />
          ))}
        </CardContent>
      </Card>

      <div className="mt-6">
        <Pagination
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          page={page}
          setPage={setPage}
        />
      </div>
    </TabsContent>
  );
};

export default Wishlist;
