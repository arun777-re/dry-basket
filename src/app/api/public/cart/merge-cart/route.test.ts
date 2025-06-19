import {POST} from './route';
import Cart from '@/models/Cart';
import { verifyUserToken } from '@/lib/middleware/verifyToken';
import { NextResponse } from 'next/server';
jest.mock('@/models/Cart');
jest.mock('@/lib/middleware/verifyToken');

describe('POST /api/cart/mergeGuestCart',()=>{
    const mockUserId = 'user123';
    const mockRequest = (body:any) =>({
        json:()=>Promise.resolve(body),
        user:{_id:mockUserId}
    });
    beforeEach(()=>{
        jest.clearAllMocks();
    });

    it('should return unauthorized if token is invalid',async()=>{
        (verifyUserToken as jest.Mock).mockResolvedValue(NextResponse.json({message:'Unauthorized'},{status:401}));

        const response = await POST(mockRequest({items:[]}) as any);
        const result = await response.json();

        expect(result.message).toBe('Unauthorized');
        expect(response.status).toBe(401)
    });
    it('should create a new cart if none exists',async()=>{
        (verifyUserToken as jest.Mock).mockResolvedValue(undefined);
        (Cart.findOne as jest.Mock).mockResolvedValue(null);
        (Cart.create as jest.Mock).mockResolvedValue({
            userId:mockUserId,
            items:[{productId:'p1',quantity:2}]
        });

        const body = {items:[{productId:'p1',quantity:2}]};
        const response = await POST(mockRequest(body) as any);
        const result = await response.json();

        expect(Cart.findOne).toHaveBeenCalledWith({userId:mockUserId});
        expect(Cart.create).toHaveBeenCalled();
        expect(result.success).toBe(true);
        expect(result.message).toBe('Guest Cart merged successfully')
    });
    it('should merge items if cart exists',async()=>{
        (verifyUserToken as jest.Mock).mockResolvedValue(undefined);

        const saveMock = jest.fn();
        const existingCart = {
            userId:mockUserId,
            items:[{
                productId:'p1',quantity:1
            }],
            save:saveMock
        };
        (Cart.findOne as jest.Mock).mockResolvedValue(existingCart);

        const body = {items:[{productId:"p1",quantity:2},{productId:'p2',quantity:1}]};

        const response = await POST(mockRequest(body) as any);
        const result = await response.json();

        expect(Cart.findOne).toHaveBeenCalled();
        expect(saveMock).toHaveBeenCalled();
        expect(result.success).toBe(true);
        expect(result.success).toBe('Guest Cart merged successfully')
    })

})