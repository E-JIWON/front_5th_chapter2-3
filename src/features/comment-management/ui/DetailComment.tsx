import { highlightText } from "@/shared/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import { CommentItem } from "@/entities/Comments/model/type"
import { Button } from "@/shared/ui/Button"
import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import useLikeComment from "../model/useLikeComment"
import useDeleteComment from "../model/useDeleteComment"

interface DetailCommentProps {
  showPostDetailDialog: boolean //   게시물 상세 보기 오픈 여부
  setShowPostDetailDialog: React.Dispatch<React.SetStateAction<boolean>> // 게시물 상세 보기 오픈 set
  selectedPost: any // 자세히 보기 선택한 포스트 - TODO: 애니 해결하기
  searchQuery: string // TODO: 드릴
  comments: CommentItem[] // 선택한 포스트의 댓글들 TODO: 이거 드릴링

  // 추가
  setShowAddCommentDialog: React.Dispatch<React.SetStateAction<boolean>> // 댓글 추가 오픈 set TODO..
  setNewComment: React.Dispatch<
    React.SetStateAction<{
      body: string
      postId: number
      userId: number
    }>
  > // TODO.. 새 댓글 상태?

  // 좋아요
  setComments: React.Dispatch<React.SetStateAction<CommentItem[]>> //;;

  // 댓글 수정
  setSelectedComment: React.Dispatch<React.SetStateAction<CommentItem>> // 선택한 댓글 -수정할 댓글
  setShowEditCommentDialog: React.Dispatch<React.SetStateAction<boolean>> // 수정 모달 set
}

const DetailComment = (props: DetailCommentProps) => {
  const {
    setShowPostDetailDialog,
    showPostDetailDialog,
    selectedPost,
    searchQuery,
    comments,
    setShowAddCommentDialog,
    setNewComment,
    setComments,
    setSelectedComment,
    setShowEditCommentDialog,
  } = props

  // 댓글 좋아요
  const { likeComment } = useLikeComment((updatedComment) => {
    setComments((prev) => {
      return prev.map((comment: CommentItem) => {
        if (comment.id === updatedComment.id) {
          return { ...comment, likes: comment.likes + 1 }
        }
        return comment
      })
    })
  })

  // 댓글 삭제
  const { deleteComment } = useDeleteComment((deletedId) => {
    setComments((prev) => {
      return prev.filter((comment: CommentItem) => comment.id !== deletedId)
    })
  })

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>

          {/* 댓글 리스트 */}
          <div className="mt-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold">댓글</h3>

              {/* 댓글 추가 버튼 */}
              <Button
                size="sm"
                onClick={() => {
                  setNewComment((prev) => ({ ...prev, postId: selectedPost?.id }))
                  setShowAddCommentDialog(true)
                }}
              >
                <Plus className="w-3 h-3 mr-1" />
                댓글 추가
              </Button>
            </div>
            <div className="space-y-1">
              {comments?.map((comment) => (
                <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
                  <div className="flex items-center space-x-2 overflow-hidden">
                    <span className="font-medium truncate">{comment.user.username}:</span>
                    <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {/* 좋아요 */}
                    <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id, comment.likes)}>
                      <ThumbsUp className="w-3 h-3" />
                      <span className="ml-1 text-xs">{comment.likes}</span>
                    </Button>
                    {/* 수정 */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedComment(comment)
                        setShowEditCommentDialog(true)
                      }}
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    {/* 삭제 */}
                    <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default DetailComment
