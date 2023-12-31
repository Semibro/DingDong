package com.ssafy.dingdong.domain.member.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.ssafy.dingdong.domain.member.entity.Member;
import com.ssafy.dingdong.domain.member.repository.MemberRedisRepository;
import com.ssafy.dingdong.domain.member.repository.MemberRepository;
import com.ssafy.dingdong.global.exception.CustomException;
import com.ssafy.dingdong.global.exception.ExceptionStatus;
import com.ssafy.dingdong.global.util.JwtProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

	private final JwtProvider jwtProvider;
	private final MemberRepository memberRepository;
	private final MemberRedisRepository memberRedisRepository;

	@Override
	public String refresh(String accessToken, String refreshToken) {
		String memberId = jwtProvider.getClaimFromExpirationToken(accessToken, "memberId");

		memberRedisRepository.findRefreshTokenByMemberId(memberId).ifPresentOrElse(
			olderRefreshToken -> {
				if (!refreshToken.equals(olderRefreshToken)) {
					throw new CustomException(ExceptionStatus.LOGOUT);
				}
			},
			() -> {
				throw new CustomException(ExceptionStatus.REFRESH_TOKEN_EXPIRED);
			}
		);

		// 만료 X
		if (!jwtProvider.isExpired(refreshToken)) {
			memberId = jwtProvider.getClaimFromExpirationToken(accessToken, "memberId");
			Member findMember = memberRepository.findByMemberId(UUID.fromString(memberId)).orElseThrow(
				() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND)
			);
			String newAccessToken = jwtProvider.createAccessToken(findMember);
			memberRedisRepository.renewalAccessToken(findMember.getMemberId().toString(), newAccessToken);
			return newAccessToken;
		}

		// 만료 O
		throw new CustomException(ExceptionStatus.REFRESH_TOKEN_EXPIRED);
	}
}
