import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// 토큰 해석 시 사용되는 타입 정의
interface DecodedToken extends JwtPayload {
    sub: string;
    "custom:role"?: string;
}

// Express의 Request 객체에 user 속성을 추가, 미들웨어를 통과한 후에 req.user를 통해 사용자 정보에 접근 가능하게 함.
declare global {
    namespace Express {
        interface Request {
            user?:{
                id: string;
                role: string;
            }
        }
    }
}

// 미들웨어 함수
// allowedRules: string[]은 API에 접근할 수 있는 사용자 역할 목록을 받는다.
export const authMiddleware = (allowedRules: string[]) => {
    // 실제 미들웨어 함수를 반환한다.
    return (req: Request, res: Response, next: NextFunction): void => {
        // 1. 헤더에서 토큰 추출
        const token = req.headers.authorization?.split(" ")[1]; //일반적으로 Bearer eyJhb..형식으로 오기 때문에 공백으로 분리하고 두 번째 부분만 가져온다.
        
        // 2. 토큰이 없으면 401에러
        if(!token){
            res.status(401).json({ message: "인증 토큰이 없습니다."});
            return;
        }

        try {
            // 3. 토큰 검증하고 해석
            const decoded = jwt.decode(token) as DecodedToken
            
            // 4. 사용자 역할 확인
            const userRole = decoded["custom:role"] || "";
            
            // 5. request 객체에 사용자 정보 추가
            req.user = {
                id: decoded.sub,
                role: userRole
            };

            // 6. 사용자 역할이 허용된 역할 목록에 포함되어 있는지 확인
            const hasAccess = allowedRules.includes(userRole.toLowerCase());
            if(!hasAccess){
                res.status(403).json({ message: "권한이 없습니다." });
                return;
            }
        } catch (err) {
            console.error("토큰 검증 오류:", err);
            res.status(401).json({ message: "토큰 검증 오류가 발생했습니다." });
            return;
        }

        // 모든 검증이 통과되면 다음 미들웨어로 이동
        next();
    };
};