import { highlightText } from "@/shared/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import { CommentItem } from "@/entities/Comments/model/type"
import { Button } from "@/shared/ui/Button"
import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import useLikeComment from "../model/useLikeComment"
import useDeleteComment from "../model/useDeleteComment"
import { useSelectedPostStore } from "@/features/posts/model/useSelectedPostStore"
import { useCommentAddStore } from "@/features/comment-add/model/useCommentAddStore"
import { useCommentEditStore } from "@/features/comment-edit/model/useCommentEditStore"

interface DetailCommentProps {
  showPostDetailDialog: boolean //   게시물 상세 보기 오픈 여부
  setShowPostDetailDialog: React.Dispatch<React.SetStateAction<boolean>> // 게시물 상세 보기 오픈 set
  searchQuery: string // TODO: 드릴
  comments: CommentItem[] // 선택한 포스트의 댓글들 TODO: 이거 드릴링

  // 좋아요
  setComments: React.Dispatch<React.SetStateAction<CommentItem[]>> //;;
}

const DetailComment = (props: DetailCommentProps) => {
  const { setShowPostDetailDialog, showPostDetailDialog, searchQuery, comments, setComments } = props

  const { openEditDialog } = useCommentEditStore()

  const { selectedPost } = useSelectedPostStore() // 선택한 포스트
  const { openAddCommentDialog } = useCommentAddStore()

  // 댓글 추가 클릭
  const handleAddCommentClick = () => {
    openAddCommentDialog(selectedPost?.id)
  }

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
              <Button size="sm" onClick={handleAddCommentClick}>
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
                        openEditDialog(comment)
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
