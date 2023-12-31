package com.ssafy.dingdong.domain.member.controller;

import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.dingdong.domain.member.dto.request.MemberSignUpDto;
import com.ssafy.dingdong.domain.member.dto.response.MemberLoginResponseDto;
import com.ssafy.dingdong.domain.member.dto.response.MemberMainDto;
import com.ssafy.dingdong.domain.member.service.MemberService;
import com.ssafy.dingdong.global.response.CommonResponse;
import com.ssafy.dingdong.global.response.DataResponse;
import com.ssafy.dingdong.global.response.ResponseService;
import com.ssafy.dingdong.global.response.ResponseStatus;
import com.ssafy.dingdong.global.util.CookieUtils;
import com.ssafy.dingdong.global.util.JwtProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController implements MemberSwagger {

	private final ResponseService responseService;
	private final MemberService memberService;
	private final JwtProvider jwtProvider;
	private final CookieUtils cookieUtils;

	@Override
	@PostMapping("/signup")
	public DataResponse<MemberLoginResponseDto> createMember(@Validated @RequestBody MemberSignUpDto memberSignUpDto, HttpServletResponse response) {
		String refreshToken = jwtProvider.createRefreshToken();

		Cookie cookie = cookieUtils.createCookie(refreshToken);
		response.addCookie(cookie);

		MemberLoginResponseDto member = memberService.createMember(memberSignUpDto, refreshToken);

		return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, member);
	}

	@Override
	@GetMapping("/login")
	public DataResponse<MemberLoginResponseDto> loginMember(Authentication authentication){
		MemberLoginResponseDto member = memberService.getLoginMember(authentication.getName().toString());
		return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, member);
	}

	@Override
	@DeleteMapping("/logout")
	public CommonResponse logout(Authentication authentication) {
		memberService.logout(authentication.getName());
		return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
	}

	@Override
	@GetMapping("/{memberId}")
	public DataResponse<MemberMainDto> getMemberByMemberId(@PathVariable String memberId) {
		MemberMainDto member = memberService.getMemberById(memberId);
		return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, member);
	}

	@Override
	@GetMapping("/{nickname}")
	public DataResponse<MemberMainDto> getMemberByNickname(@PathVariable String nickname) {
		MemberMainDto member = memberService.getMemberByNickname(nickname);
		return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, member);
	}

	@Override
	@GetMapping("/range/{nickname}")
	public DataResponse<List<MemberMainDto>> getMemberListLikeNickname(@PathVariable String nickname) {
		List<MemberMainDto> memberList = memberService.getMemberListLikeNickname(nickname);
		return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, memberList);
	}

	@Override
	@GetMapping
	public DataResponse<MemberMainDto> getMember(Authentication authentication) {
		MemberMainDto member = memberService.getMemberById(authentication.getName().toString());
		return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, member);
	}

	@Override
	@GetMapping("/connect")
	public CommonResponse createSession(Authentication authentication) {
		memberService.createSession(authentication.getName());
		return responseService.successResponse(ResponseStatus.SESSION_CREATED);
	}

	@Override
	@DeleteMapping("/disconnect")
	public CommonResponse deleteSession(Authentication authentication) {
		memberService.deleteSession(authentication.getName());
		return responseService.successResponse(ResponseStatus.SESSION_DELETED);
	}

	@Override
	@DeleteMapping
	public CommonResponse deleteMember(Authentication authentication) {
		memberService.deleteMember(authentication.getName());
		return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
	}

	@Override
	@GetMapping("/check/{nickname}")
	public CommonResponse nicknameIsUnique(@PathVariable String nickname) {
		boolean result = memberService.isMemberByNickname(nickname);
		if (result) {
			return responseService.successResponse(ResponseStatus.NICKNAME_IS_UNIQUE);
		}else {
			return responseService.successResponse(ResponseStatus.NICKNAME_IS_DUPLICATED);
		}
	}

}
