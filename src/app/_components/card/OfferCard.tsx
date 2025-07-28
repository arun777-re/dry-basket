import { OfferDocument } from "@/types/offer";
import { Card } from "@radix-ui/themes";
import React from "react";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { deleteoffer, viewoffer } from "@/redux/slices/offerSlice";
import toast from "react-hot-toast";
import UpdateForm from "../form/UpdateForm";
import { MdCancel } from "react-icons/md";

const OfferCard: React.FC<OfferDocument> = ({
  _id,
  value,
  description,
  discountType,
  active,
  expiresAt,
  appliesToCategories,
  timesUsed,
  usageLimit,
  code,
}) => {
  // state to manage popup
  const [pop, setPop] = React.useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const DeleteOffer = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(deleteoffer(_id))
      .unwrap()
      .then((res) => {
        dispatch(viewoffer());
        toast.success(res.message);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <Card
      size={"4"}
      className="w-[36vw] h-[240px] shadow-xl relative rounded-md"
    >
      <div className="p-4 w-full h-full relative flex flex-col items-center gap-8">
        <article className="w-full h-auto relative flex flex-wrap gap-4">
          <h5>{code}</h5>
          <p>{description}</p>
          <p>Discount Type:{discountType}</p>
          <p>Discount Value:{value}</p>
          <p>Active:{active}</p>
          <p>Categories:{appliesToCategories}</p>
          <p>
            expiresAt:
            {expiresAt ? new Date(expiresAt).toLocaleDateString() : "N/A"}
          </p>
          <p>used:{timesUsed}</p>
          <p>limit:{usageLimit}</p>
        </article>
        <div className="w-full h-auto flex gap-4 justify-between">
          <Button
            type="button"
            onClick={DeleteOffer}
            className="px-3 py-2 border-2 border-first bg-white hover:bg-first transition-all duration-500 ease-in-out cursor-pointer"
          >
            Delete Offer
          </Button>
          <Button
            type="button"
            onClick={() => setPop(true)}
            className="px-3 py-2 border-2 border-first bg-white hover:bg-first transition-all duration-500 ease-in-out cursor-pointer"
          >
            Update Offer
          </Button>
        </div>
      </div>
      <div className="w-auto h-auto absolute top-0 left-0">
        {pop === true && <UpdateForm _id={_id}/>}
        <MdCancel
          onClick={() => setPop((prev) => !prev)}
          size={30}
          className={`absolute ${pop === true ? '' : 'hidden'} top-0 right-0 cursor-pointer bg-white`}
        />
      </div>
    </Card>
  );
};

export default OfferCard;
